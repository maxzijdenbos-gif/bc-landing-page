import config from 'next.config';
import {
  NewsLetterSignUpError,
  NewsletterSignupForm,
  NewsLetterSignUpResponse,
} from './subscribe-newsletter.types';

// Client side
export const subscribeUserToNewsletter = async (
  data: NewsletterSignupForm,
): Promise<NewsLetterSignUpResponse | NewsLetterSignUpError> => {
  const response = await fetch(`${config.basePath}/api/newsletter/sign-up`, {
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (!response.ok) {
    const errorResponse: NewsLetterSignUpError = await response.json();

    throw new Error(response.statusText, { cause: errorResponse.code });
  }

  const responseData: NewsLetterSignUpResponse = await response.json();

  return responseData;
};

// server side
export const postSubscribeProfileNewsletter = async (
  body: NewsletterSignupForm,
  privateKey: string,
  profileId: string,
  listId: string,
) => {
  const endpoint =
    'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs';
  const bodyData = {
    data: {
      attributes: {
        custom_source: 'Marketing Event',
        historical_import: false,
        profiles: {
          data: [
            {
              attributes: {
                email: body.email_address,
                subscriptions: {
                  email: {
                    marketing: {
                      consent: 'SUBSCRIBED',
                    },
                  },
                },
              },
              id: profileId,
              type: 'profile',
            },
          ],
        },
      },
      relationships: {
        list: {
          data: {
            id: listId,
            type: 'list',
          },
        },
      },
      type: 'profile-subscription-bulk-create-job',
    },
  };

  const subscribeOptions = {
    body: JSON.stringify(bodyData),
    headers: {
      accept: 'application/vnd.api+json',
      Authorization: `Klaviyo-API-Key ${privateKey}`,
      'content-type': 'application/vnd.api+json',
      revision: '2024-10-15',
    },
    method: 'POST',
  };

  return await fetch(endpoint, subscribeOptions);
};

export const postCreateProfile = async (
  body: NewsletterSignupForm,
  privateKey: string,
) => {
  const url = 'https://a.klaviyo.com/api/profiles';
  const klaviyoData = {
    data: {
      attributes: {
        email: body.email_address,
        properties: {
          cultureCode: body.cultureCode,
          'email-consent': String(body['email-consent']),
        },
      },
      type: 'profile',
    },
  };
  const options = {
    body: JSON.stringify(klaviyoData),
    headers: {
      accept: 'application/vnd.api+json',
      Authorization: `Klaviyo-API-Key ${privateKey}`,
      'content-type': 'application/vnd.api+json',
      revision: '2024-10-15',
    },
    method: 'POST',
  };

  return await fetch(url, options);
};
