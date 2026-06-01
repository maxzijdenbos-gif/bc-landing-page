import * as Icons from 'assets/icons/icons';
import { ButtonProps } from 'components/molecules/button/button';
import { WistiaEmbedConfig } from 'components/organisms/embedded-video/embedded-video';
import { CookieInformationAPIProps } from 'libraries/contexts/cookie-consent-context';

declare global {
  interface Window {
    CookieConsent: {
      renew: () => void;
    };
    CookieInformation: CookieInformationAPIProps;
    _wq: WistiaEmbedConfig[];
  }
  type BackgroundColor =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'quinary'
    | undefined;

  type NavigationVariants = 'primary' | 'secondary' | null;

  type IconName = keyof typeof Icons;

  type Locale = string;

  type RichText = string | React.ReactNode;

  type TextColor = 'accent' | 'contrast';

  type Theme = 'giant' | 'liv';

  type BrandNames = 'giant' | 'momentum' | 'liv';

  interface BaseLink {
    anchorLink?: null | string;
    externalLink?: null | string;
    internalLink?: null | string;
    /** internalLinkRef: Is primary used for the internal link extension, use internalLink for the actual slug */
    internalLinkRef?: {
      _meta: Pick<ContentMeta, 'schema'>;
      contentType: string;
      id: string;
    }[];
    linkText?: null | string;
    linkType?: null | string;
    modalId?: null | string;
    target?: string;
  }

  interface BaseButton {
    lineBreakBefore?: boolean;
    link: BaseLink;
    style?: ButtonProps['variant'];
  }

  export interface NodeContainer<T> {
    children: NodeContainer<T>[];
    content: T;
  }
}

export {};
