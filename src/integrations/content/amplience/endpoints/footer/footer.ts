import { FooterProps } from 'components/organisms/footer/footer';
import { getContentDeliveryKey } from '../get-content/get-content-delivery-key';

const footerDeliveryKey = (locale: Locale) => {
  return `${locale}-footer`;
};

export const getFooter = async (locale: string, stagingEnv?: string) => {
  try {
    const response = await getContentDeliveryKey<FooterProps>({
      locale,
      slug: footerDeliveryKey(locale),
      stagingEnvironment: stagingEnv,
    });

    return response;
  } catch (error) {
    return {};
  }
};
