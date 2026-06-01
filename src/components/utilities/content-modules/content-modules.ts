import dynamic from 'next/dynamic';
import { AnchorProps } from 'components/atoms/anchor/anchor';
import { HeroCategoryProps } from 'components/molecules/hero-category/hero-category';
import { HeroFrontPageProps } from 'components/molecules/hero-front-page/hero-front-page';
import { HeroRangeProps } from 'components/molecules/hero-range/hero-range';
import { ImageWithCreditTextProps } from 'components/molecules/image-with-credit-text/image-with-credit-text';
import { ModuleModalProps } from 'components/molecules/module-modal/module-modal';
import { NewsletterSignUpProps } from 'components/molecules/newsletter-sign-up/newsletter-sign-up';
import { ProductListHeroProps } from 'components/molecules/product-list-hero/product-list-hero';
import { ContentHighlightProps } from 'components/organisms/content-highlight/content-highlight';
import { CookiePolicyProps } from 'components/organisms/cookie-policy/cookie-policy';
import { EmbeddedVideoProps } from 'components/organisms/embedded-video/embedded-video';
import { EndorsementsProps } from 'components/organisms/endorsements/endorsements';
import { EntryCardsListProps } from 'components/organisms/entry-cards-list/entry-cards-list';
import { EntryCardsSliderWithParagraphProps } from 'components/organisms/entry-cards-slider-with-paragraph/entry-cards-slider-with-paragraph';
import { HeroGuidesAndArticlesProps } from 'components/organisms/hero-guides-and-articles/hero-guides-and-articles';
import { HeroTextProps } from 'components/organisms/hero-text/hero-text';
import { HeroWithImageProps } from 'components/organisms/hero-with-image/hero-with-image';
import { ModuleAccordionProps } from 'components/organisms/module-accordion/module-accordion';
import { ModuleAccordionWithImagesProps } from 'components/organisms/module-accordion-with-images/module-accordion-with-images';
import { ModuleSitemapProps } from 'components/organisms/module-sitemap/module-sitemap';
import { ParagraphWithMediaProps } from 'components/organisms/paragraph-with-media/paragraph-with-media';
import { PortraitImageGalleryProps } from 'components/organisms/portrait-image-gallery/portrait-image-gallery';
import { ProductCarouselProps } from 'components/organisms/product-carousel/product-carousel';
import { ShopSeriesProps } from 'components/organisms/shop-series/shop-series';
import { SimilarProductsProps } from 'components/organisms/similar-products/similar-products';
import { StatsProps } from 'components/organisms/stats/stats';
import { StorytellingProps } from 'components/organisms/storytelling/storytelling';
import { TableProps } from 'components/organisms/table/table';
import { TeaserListProps } from 'components/organisms/teaser-list/teaser-list';
import { TextProps } from 'components/organisms/text/text';
import { TwoColumnFactsProps } from 'components/organisms/two-column-facts/two-column-facts';
import { VideoTeaserProps } from 'components/organisms/video-teaser/video-teaser';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';

const ModuleAccordion = dynamic(
  () => import('components/organisms/module-accordion/module-accordion'),
);
const SimilarProducts = dynamic(
  () => import('components/organisms/similar-products/similar-products'),
);
const ModuleAccordionWithImages = dynamic(
  () =>
    import('components/organisms/module-accordion-with-images/module-accordion-with-images'),
);
const Anchor = dynamic(() => import('components/atoms/anchor/anchor'));
const TeaserList = dynamic(
  () => import('components/organisms/teaser-list/teaser-list'),
);
const HeroCategory = dynamic(
  () => import('components/molecules/hero-category/hero-category'),
);
const CookiePolicy = dynamic(
  () => import('components/organisms/cookie-policy/cookie-policy'),
);
const Text = dynamic(() => import('components/organisms/text/text'));
const ContentHighlight = dynamic(
  () => import('components/organisms/content-highlight/content-highlight'),
);
const EmbeddedVideo = dynamic(
  () => import('components/organisms/embedded-video/embedded-video'),
);
const HeroFrontPage = dynamic(
  () => import('components/molecules/hero-front-page/hero-front-page'),
);
const EntryCardsList = dynamic(
  () => import('components/organisms/entry-cards-list/entry-cards-list'),
);
const HeroText = dynamic(
  () => import('components/organisms/hero-text/hero-text'),
);
const HeroRange = dynamic(
  () => import('components/molecules/hero-range/hero-range'),
);
const HeroWithImage = dynamic(
  () => import('components/organisms/hero-with-image/hero-with-image'),
);
const Table = dynamic(() => import('components/organisms/table/table'));
const ModuleSitemap = dynamic(
  () => import('components/organisms/module-sitemap/module-sitemap'),
);
const NewsletterSignUp = dynamic(
  () => import('components/molecules/newsletter-sign-up/newsletter-sign-up'),
);
const Stats = dynamic(() => import('components/organisms/stats/stats'));
const HeroGuidesAndArticles = dynamic(
  () =>
    import('components/organisms/hero-guides-and-articles/hero-guides-and-articles'),
);
const ImageWithCreditText = dynamic(
  () =>
    import('components/molecules/image-with-credit-text/image-with-credit-text'),
);
const ModuleModal = dynamic(
  () => import('components/molecules/module-modal/module-modal'),
);
const ProductListHero = dynamic(
  () => import('components/molecules/product-list-hero/product-list-hero'),
);
const TwoColumnFacts = dynamic(
  () => import('components/organisms/two-column-facts/two-column-facts'),
);
const VideoTeaser = dynamic(
  () => import('components/organisms/video-teaser/video-teaser'),
);
const ParagraphWithMedia = dynamic(
  () =>
    import('components/organisms/paragraph-with-media/paragraph-with-media'),
);
const ProductCarousel = dynamic(
  () => import('components/organisms/product-carousel/product-carousel'),
);
const StoryTelling = dynamic(
  () => import('components/organisms/storytelling/storytelling'),
);
const ShopSeries = dynamic(
  () => import('components/organisms/shop-series/shop-series'),
);
const PortraitImageGallery = dynamic(
  () =>
    import('components/organisms/portrait-image-gallery/portrait-image-gallery'),
);
const Endorsements = dynamic(
  () => import('components/organisms/endorsements/endorsements'),
);
const EntryCardsSliderWithParagraph = dynamic(
  () =>
    import('components/organisms/entry-cards-slider-with-paragraph/entry-cards-slider-with-paragraph'),
);

export type ContentModule =
  | {
      data: ModuleAccordionProps;
      name: 'Accordion';
    }
  | {
      data: ModuleAccordionWithImagesProps;
      name: 'AccordionImageStack';
    }
  | {
      data: AnchorProps;
      name: 'AnchorLink';
    }
  | {
      data: ModuleSitemapProps;
      name: 'Sitemap';
    }
  | {
      data: ContentHighlightProps;
      name: 'ContentHighlight';
    }
  | {
      data: TeaserListProps;
      name: 'TeaserListSocialMedia';
    }
  | {
      data: TeaserListProps;
      name: 'TeaserListContent';
    }
  | {
      data: CookiePolicyProps;
      name: 'CookiePolicy';
    }
  | {
      data: EmbeddedVideoProps;
      name: 'EmbeddedVideo';
    }
  | {
      data: EndorsementsProps;
      name: 'Endorsements';
    }
  | {
      data: EntryCardsSliderWithParagraphProps;
      name: 'EntryCardsSliderWithParagraph';
    }
  | {
      data: EntryCardsListProps;
      name: 'EntryCardsList';
    }
  | {
      data: HeroCategoryProps;
      name: 'HeroCategory';
    }
  | {
      data: HeroTextProps;
      name: 'Hero';
    }
  | {
      data: HeroFrontPageProps;
      name: 'HeroFrontPage';
    }
  | {
      data: HeroRangeProps;
      name: 'HeroRange';
    }
  | {
      data: HeroGuidesAndArticlesProps;
      name: 'HeroGuidesAndArticles';
    }
  | {
      data: HeroWithImageProps;
      name: 'HeroWithBackgroundImage';
    }
  | {
      data: ImageWithCreditTextProps;
      name: 'ImageWithCreditText';
    }
  | {
      data: PortraitImageGalleryProps;
      name: 'PortraitImageGallery';
    }
  | {
      data: ModuleModalProps;
      name: 'ModalWithTabs';
    }
  | {
      data: NewsletterSignUpProps;
      name: 'NewsletterSignUp';
    }
  | {
      data: ProductListHeroProps;
      name: 'ProductListHero';
    }
  | {
      data: TwoColumnFactsProps;
      name: 'TwoColumnFacts';
    }
  | {
      data: VideoTeaserProps;
      name: 'VideoTeaser';
    }
  | {
      data: ParagraphWithMediaProps;
      name: 'ParagraphWithMedia';
    }
  | {
      data: ProductCarouselProps;
      name: 'ProductSeriesCarousel';
    }
  | {
      data: ShopSeriesProps;
      name: 'ShopSeries';
    }
  | {
      data: StatsProps;
      name: 'Stats';
    }
  | {
      data: TableProps;
      name: 'Table';
    }
  | {
      data: TeaserListProps;
      name: 'TeaserListContent';
    }
  | {
      data: TeaserListProps;
      name: 'TeaserListSocialMedia';
    }
  | {
      data: TextProps;
      name: 'Copy';
    }
  | {
      data: SimilarProductsProps;
      name: 'SimilarProducts';
    }
  | {
      data: StorytellingProps;
      name: 'StoryTelling';
    };

export type ContentModuleName = ContentModule['name'];
export type ContentModuleProps = ContentModule['data'] & {
  schemaData?: PageAdapter['schemaData'];
};

// Actual code to run
const ModuleComponentMap: {
  [key in ContentModuleName]: React.ComponentType<any>;
} = {
  Accordion: ModuleAccordion,
  AccordionImageStack: ModuleAccordionWithImages,
  AnchorLink: Anchor,
  ContentHighlight,
  CookiePolicy,
  Copy: Text,
  EmbeddedVideo,
  Endorsements,
  EntryCardsList,
  EntryCardsSliderWithParagraph,
  Hero: HeroText,
  HeroCategory,
  HeroFrontPage,
  HeroGuidesAndArticles,
  HeroRange,
  HeroWithBackgroundImage: HeroWithImage,
  ImageWithCreditText,
  ModalWithTabs: ModuleModal,
  NewsletterSignUp,
  ParagraphWithMedia,
  PortraitImageGallery,
  ProductListHero,
  ProductSeriesCarousel: ProductCarousel,
  ShopSeries,
  SimilarProducts,
  Sitemap: ModuleSitemap,
  Stats,
  StoryTelling,
  Table,
  TeaserListContent: TeaserList,
  TeaserListSocialMedia: TeaserList,
  TwoColumnFacts,
  VideoTeaser,
};

/**
 * Since we have multiple versions of the same module, we need to remove the suffix to get the correct component.
 * We have multiple version in order to support localized versions of the same module.
 * This is a demand from the Amplience architecture
 * @param schema - ContentModuleName
 * @returns - ContentModuleName without the Localized suffix
 */
const removeLocalizedSuffix = (schema: ContentModuleName) => {
  return schema.split('Localized')[0] as ContentModuleName;
};

export function getModuleComponent(
  name: ContentModuleName,
  props: ContentModuleProps,
): {
  component: React.ComponentType<ContentModuleProps>;
  props: ContentModuleProps;
} {
  const Component = ModuleComponentMap[removeLocalizedSuffix(name)];

  return { component: Component, props };
}

export const isContentModule = (dto: unknown): dto is ContentModule => {
  if (!dto || typeof dto !== 'object') return false;
  if (typeof (dto as ContentModule).name !== 'string') return false;
  if (typeof (dto as ContentModule).data !== 'object') return false;

  return true;
};
