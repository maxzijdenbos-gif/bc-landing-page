import { NextApiRequest, NextApiResponse } from 'next';
import {
  postCreateProfile,
  postSubscribeProfileNewsletter,
} from 'integrations/klaviyo/subscriptions/subscribe-newsletter/subscribe-newsletter';
import { NewsletterSignupForm } from 'integrations/klaviyo/subscriptions/subscribe-newsletter/subscribe-newsletter.types';

/**
 * Approach for subscribing a user to a newsletter list in Klaviyo
 * 1. Create a new profile in Klaviyo
 *
 * Profile exits:
 * 1.1. If the profile already exists, Klaviyo will return a 400 status code with a duplicate_profile error
 * 1.1.1 extract the profile id from the error response
 *
 * Profile does not exist:
 * 1.2 If the profile does not exist, Klaviyo will return a 200 status code with the profile data
 * 1.2.1 extract the profile id from the response
 *
 * 2. Subscribe the profile to the newsletter list - through the bulk create job endpoint
 */

const API_KEY = process.env.KLAVIYO_API_KEY;
const LIST_ID = process.env.KLAVIYO_NEWSLETTER_LIST_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!API_KEY || !LIST_ID) {
    res.status(500).send({ statusText: 'key not configured' });

    return;
  }

  const { body } = req as { body: string };
  const parsedBody: NewsletterSignupForm = JSON.parse(body);

  try {
    const response = await postCreateProfile(parsedBody, API_KEY); // Create profile
    const parsedResponse = await response.json(); // Parsed response, to retrieve profileId

    // If the profile already exists, Klaviyo will return a 400 status code with a duplicate_profile error
    // If the profile_id is not returned then the entire chain of request will fail
    if (!response.ok) {
      const profileId = parsedResponse?.errors?.[0]?.meta?.duplicate_profile_id;

      const subscribeResponse = await postSubscribeProfileNewsletter(
        parsedBody,
        API_KEY,
        profileId,
        LIST_ID,
      );

      if (subscribeResponse.ok) {
        res.send(response);
      }

      if (!subscribeResponse.ok) {
        res.status(subscribeResponse.status).send(subscribeResponse.statusText);
      }

      res
        .status(response?.status ?? '500')
        .send({ statusText: response?.statusText ?? 'An error occurred' });
    }

    // If the profile does not exist, Klaviyo will return a 200 status code with the profile data
    const profileId = parsedResponse?.data?.id;
    const subscribeResponse = await postSubscribeProfileNewsletter(
      parsedBody,
      API_KEY,
      profileId,
      LIST_ID,
    );

    res.send(subscribeResponse);
  } catch (error) {
    res.status(500).send(error);
  }
}
