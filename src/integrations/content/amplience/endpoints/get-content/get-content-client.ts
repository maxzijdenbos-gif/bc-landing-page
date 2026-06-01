import { ContentClient } from 'dc-delivery-sdk-js';

interface ContentClientOptions {
  locale?: string;
  stagingEnvironment?: string;
}

export const getContentClient = ({
  locale,
  stagingEnvironment,
}: ContentClientOptions) => {
  if (!process.env.NEXT_PUBLIC_AMPLIENCE_HUB_ID) {
    throw new Error('Missing hubName');
  }

  // This check is made, because sometimes the build will fail because the 'default' locale is not properly handled back next.js
  const localeCheck = locale !== 'default' ? locale : undefined;

  const client = new ContentClient({
    hubName: process.env.NEXT_PUBLIC_AMPLIENCE_HUB_ID,
    locale: localeCheck,
    stagingEnvironment,
  });

  return client;
};
