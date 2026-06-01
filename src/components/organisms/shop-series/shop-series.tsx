import { useState } from 'react';
import RangeLogo, {
  RangeIconName,
} from 'components/molecules/range-logo/range-logo';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import Row from 'components/utilities/row/row';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import { ExplorePageCategories } from 'types/explore-pages';
import ChooseModelModal from './choose-model-modal/choose-model-modal';
import ShopSeriesCard from './shop-series-card/shop-series-card';
import styles from './shop-series.module.scss';

export interface ModalBikeProps {
  fromPrice?: string;
  imageObject: AmplienceImagePayload;
  link?: string;
  name: string;
}

export interface SeriesElementProps {
  fromPrice?: string;
  imageObject: AmplienceImagePayload;
  link?: string;
  modalBikes?: ModalBikeProps[];
  modalFrameBike?: ModalBikeProps;
  numberOfVariants?: string;
  seriesDescription: string;
  seriesName: string;
  tags: string[];
}

export interface ShopSeriesProps extends ModuleWrapperProps {
  bikeCategory?: ExplorePageCategories;
  rangeIconReference?: {
    rangeIconsName: RangeIconName;
  }[];
  seriesElements: SeriesElementProps[];
}

const ShopSeries = ({
  anchor,
  anchorTarget,
  bikeCategory,
  seriesElements,
  rangeIconReference,
  color,
}: ShopSeriesProps) => {
  const [activeModalBikes, setActiveModalBikes] = useState<ModalBikeProps[]>([]);

  const { domNode: logoNode, isViewed: logoIsViewed } = useIntersectionObserver(
    {
      rootMargin: '0% 0% -10% 0%',
      unObserveOnThreshold: 0,
    },
  );
  const { domNode: cardsNode, isViewed: cardsIsViewed } =
    useIntersectionObserver({
      rootMargin: '0% 0% -20% 0%',
      unObserveOnThreshold: 0,
    });

  return (
    <>
      <ModuleWrapper
        anchor={anchor}
        anchorTarget={anchorTarget}
        className={styles.component}
        color={color}
      >
        {!!bikeCategory && !!rangeIconReference?.[0]?.rangeIconsName && (
          <Container>
            <Row outerGutter={{ mobile: 'medium' }}>
              <Column className={styles.iconContainer}>
                <MotionSlide
                  direction="up"
                  initMotion={logoIsViewed}
                  speed="speed-verySlow"
                >
                  <div ref={logoNode}>
                    <RangeLogo
                      ariaLabel={rangeIconReference[0].rangeIconsName}
                      ariaLevel={2}
                      categoryName={bikeCategory}
                      className={styles.rangeLogo}
                      rangeName={rangeIconReference[0].rangeIconsName}
                      role="heading"
                    />
                  </div>
                </MotionSlide>
              </Column>
            </Row>
          </Container>
        )}
        {seriesElements && (
          <div ref={cardsNode} className={styles.cardContainer}>
            <MotionSlide
              className={styles.cardInnerContainer}
              direction="up"
              initMotion={cardsIsViewed}
              speed="speed-verySlow"
            >
              {seriesElements.map((seriesElement, index) => {
                return (
                  <ShopSeriesCard
                    key={seriesElement.seriesName + index}
                    fromPrice={seriesElement.fromPrice}
                    imageObject={seriesElement.imageObject}
                    link={seriesElement.link}
                    numberOfVariants={seriesElement.numberOfVariants}
                    onCustomizeBikeClick={
                      seriesElement.modalBikes?.length
                        ? () => setActiveModalBikes(seriesElement.modalBikes!)
                        : undefined
                    }
                    onCustomizeFrameClick={
                      seriesElement.modalFrameBike
                        ? () => setActiveModalBikes([seriesElement.modalFrameBike!])
                        : undefined
                    }
                    seriesDescription={seriesElement.seriesDescription}
                    seriesName={seriesElement.seriesName}
                    tags={seriesElement.tags}
                  />
                );
              })}
            </MotionSlide>
          </div>
        )}
      </ModuleWrapper>

      <ChooseModelModal
        bikes={activeModalBikes}
        isOpen={activeModalBikes.length > 0}
        onClose={() => setActiveModalBikes([])}
      />
    </>
  );
};

ShopSeries.displayName = 'ShopSeries';

export default ShopSeries;
