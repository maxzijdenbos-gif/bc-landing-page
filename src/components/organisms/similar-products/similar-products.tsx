import { useI18n } from 'next-localization';
import { useState } from 'react';
import ControlButtonArrow from 'components/atoms/control-buttons/arrow/arrow';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import useSlider from 'libraries/hooks/use-slider';
import useSliderTracking from 'libraries/hooks/use-slider-tracking';
import SimilarProductsSlide, {
  SimilarProductsSlideProps,
} from './similar-products-slide/similar-products-slide';
import styles from './similar-products.module.scss';

export interface SimilarProductsProps extends ModuleWrapperProps {
  headline: string;
  products: SimilarProductsSlideProps[];
}

const SimilarProducts = ({
  headline,
  products,
  ...rest
}: SimilarProductsProps) => {
  const { isDesktopView, isTabletOrAbove } = useBreakpoints();
  const showSlider = isTabletOrAbove
    ? isDesktopView
      ? products?.length > 3
      : products?.length > 2
    : products?.length > 1;
  const { t } = useI18n();
  const [[canScrollPrev, canScrollNext], setCanScroll] = useState<boolean[]>([
    false,
    false,
  ]);

  const [emblaRef, emblaApi] = useSlider(
    {
      accessibility: {
        onUpdateAria: (api, currentSlide, totalSlides) => {
          const currentIndex = api.selectedScrollSnap();
          const product = products?.[currentIndex % (products?.length ?? 1)];
          const parts = [
            t('productSeriesCarousel.progressSentence', {
              currentSlide,
              totalSlides,
            }),
          ];
          if (product?.name) parts.push(product.name);
          if (product?.category) parts.push(product.category);
          if (product?.image?.alt) parts.push(product.image.alt);
          return parts.filter(Boolean).join('. ');
        },
        skipAriaHidden: true,
        totalSlides: products?.length ?? 0,
      },
      progress: {
        onProgress: (_, api) =>
          setCanScroll([api.canScrollPrev(), api.canScrollNext()]),
      },
    },
    { align: 'start', loop: true, skipSnaps: true },
  );

  useSliderTracking(headline, emblaApi);

  if (!products?.length) return;

  return (
    <ModuleWrapper {...rest} className={styles.component}>
      <Container>
        <Row>
          <Column
            offset={{
              laptop: 1,
              mobile: 0,
            }}
            width={{
              laptop: 10,
              mobile: 12,
            }}
          >
            <div className={styles.headline}>
              <Typography tag="h2" tagStyle="displayXSmall" weight="heavy">
                {headline}
              </Typography>
              {showSlider &&
                isTabletOrAbove &&
                (canScrollPrev || canScrollNext) && (
                  <div className={styles.arrows}>
                    <ControlButtonArrow
                      disabled={!canScrollPrev}
                      iconName="ArrowLeft_32"
                      label={t('productDetails.relatedProductsPrevious')}
                      onClick={emblaApi?.scrollPrev}
                    />
                    <ControlButtonArrow
                      disabled={!canScrollNext}
                      iconName="ArrowRight_32"
                      label={t('productDetails.relatedProductsNext')}
                      onClick={emblaApi?.scrollNext}
                    />
                  </div>
                )}
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <div
              aria-label={
                headline
                  ? t('carouselRegion.withTitle', { title: headline })
                  : t('carouselRegion.similarProducts')
              }
              role="region"
            >
              <div
                ref={showSlider ? emblaRef : undefined}
                className={styles.slider}
              >
                <div className={styles.container}>
                  {products.map((product, index) => (
                    <div
                      key={index}
                      aria-label={t('productSeriesCarousel.progressSentence', {
                        currentSlide: index + 1,
                        totalSlides: products.length,
                      })}
                      className={styles.slide}
                      role="group"
                    >
                      <SimilarProductsSlide {...product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

SimilarProducts.displayName = 'SimilarProducts';

export default SimilarProducts;
