import { NextApiRequest, NextApiResponse } from 'next';
import { createManagementClient } from 'integrations/content/amplience/endpoints/management/content-management';
import { UpdateContentItemPayload } from 'integrations/content/amplience/endpoints/management/content-management.types';

const PAT = process.env.AMPLIENCE_PAT;

// Guarded by middleware
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!PAT) {
    res.status(500).send({ statusText: 'Not configured properly' });

    return;
  }

  const { contentItem, localizationStatus, locale } =
    (req.body as UpdateContentItemPayload) ?? {};

  if (!contentItem || !localizationStatus || !locale) {
    res.status(400).send({
      statusText: 'Missing required fields',
    });

    return;
  }

  const managementClient = createManagementClient({
    patToken: PAT,
  });

  try {
    contentItem.body.localizedInfo.localizationStatus[locale] =
      localizationStatus;

    (await managementClient.contentItems.get(contentItem.id)).related.update(
      contentItem,
    );
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    const jsonError = (error as any)?.response?.data?.errors;
    const errorMessage =
      typeof error === 'string'
        ? error
        : 'An error occurred, try again or contact administrator for assistance.';

    const errorResponse = [
      {
        message: jsonError ?? errorMessage,
      },
    ];

    res.status(400).json(jsonError ?? errorResponse);
  }
}
