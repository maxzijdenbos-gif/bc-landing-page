import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { MainNavigationMessageBar } from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import type {
  EcommerceApiBrand,
  MessageBarData,
} from 'integrations/ecommerce-api/ecommerce-api.types';
import { ecommerceApiQuery } from 'integrations/ecommerce-api/ecommerce-client';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import { toEcommerceApiLocale } from 'libraries/utilities/locale/to-ecommerce-api-locale';

const MESSAGE_BAR_API_PATH = '/content/message-bar' as const;

function resolveMessageBarApiBrand(): EcommerceApiBrand {
  return process.env.NEXT_PUBLIC_THEME_NAME === 'liv' ? 'liv' : 'giant';
}

function messageBarFromApi(
  api: MessageBarData | undefined,
): MainNavigationMessageBar | null {
  const apiMessage = api?.message?.trim();
  if (!api || !apiMessage) return null;

  const hasApiLink = Boolean(api.linkUrl?.trim());
  return {
    link: hasApiLink ? (api.linkUrl ?? null) : null,
    linkText: hasApiLink ? (api.linkLabel ?? '') : null,
    message: api.message ?? apiMessage,
    variant: 'Primary',
  };
}

/**
 * Fetches message bar copy from the e-commerce API.
 * Pass `fetchEnabled` false when the header is not shown (e.g. iframe or no navigation) to skip the request.
 */
export function useMessageBar(fetchEnabled: boolean): {
  messageBar: MainNavigationMessageBar | null;
} {
  const { asPath } = useRouter();
  const pathLocale = useMemo(() => getLocaleFromAsPath(asPath), [asPath]);

  const apiLocale = useMemo(
    () => (pathLocale ? toEcommerceApiLocale(pathLocale) : ''),
    [pathLocale],
  );

  const { data: apiMessageBar } = ecommerceApiQuery.useQuery(
    'get',
    MESSAGE_BAR_API_PATH,
    {
      params: {
        query: {
          Brand: resolveMessageBarApiBrand(),
          Locale: apiLocale,
        },
      },
    },
    {
      enabled: Boolean(apiLocale && fetchEnabled),
    },
  );

  return { messageBar: messageBarFromApi(apiMessageBar) };
}
