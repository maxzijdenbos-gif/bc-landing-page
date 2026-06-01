import classNames from 'classnames';
import { useRef } from 'react';
import Image, { ImageProps } from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Breadcrumb from 'components/molecules/breadcrumb/breadcrumb';
import { useProductListAnimateContext } from 'components/templates/product-list-page/animate-context/use-animate-context';
import Column from 'components/utilities/column/column';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import Row from 'components/utilities/row/row';
import { useSetNavigationColor } from 'libraries/hooks/navigation/use-set-navigation-color';
import Button from '../button/button';
import styles from './product-list-hero.module.scss';

export interface ProductListHeroProps extends ModuleWrapperProps {
  breadcrumbs?: any;
  buttonGroup?: BaseButton[];
  headline: string;
  imageObject: ImageProps['imageObject'];
  theme: 'Dark' | 'Light';
}

const ProductListHero = ({
  buttonGroup,
  imageObject,
  headline,
  theme = 'Light',
}: ProductListHeroProps) => {
  // start manipulate navigation color
  const self = useRef<HTMLDivElement>(null);

  useSetNavigationColor(self, 'secondary');
  // end manipulate navigation color

  const { animationActivated } = useProductListAnimateContext();

  return (
    <ModuleWrapper ref={self} className={styles.component} color={'quaternary'}>
      <Image
        alt={imageObject?.alt}
        className={styles.heroImage}
        fill
        imageObject={imageObject}
        fetchPriority="high"
        priority
      />
      <div
        className={classNames(styles.overlay, {
          [styles.dark]: theme === 'Dark',
        })}
      />
      <Row
        className={styles.titleContainer}
        classNameOuter={styles.titleContainerOuter}
      >
        <Column offset={{ tablet: 3 }} width={{ mobile: 12, tablet: 6 }}>
          <MotionFade speed="speed-verySlow">
            <Breadcrumb
              centerItems
              className={styles.breadcrumb}
              doGradientOnOverflow
            />
          </MotionFade>
        </Column>
        <Column
          className={styles.titleColumn}
          offset={{ mobile: 2, tablet: 3 }}
          width={{ mobile: 8, tablet: 6 }}
        >
          <MotionSlide
            direction="left-right"
            initMotion={animationActivated}
            speed="speed-verySlow"
          >
            <Typography tag="h1" tagStyle="displayXLarge">
              {headline}
            </Typography>
          </MotionSlide>
          {!!buttonGroup?.length && (
            <MotionFade initMotion={animationActivated} speed="speed-verySlow">
              {buttonGroup.map((button, index) => {
                return (
                  <Button
                    key={index}
                    link={button.link}
                    target={button.link?.target}
                    text={button.link?.linkText ?? ''}
                  />
                );
              })}
            </MotionFade>
          )}
        </Column>
      </Row>
    </ModuleWrapper>
  );
};

ProductListHero.displayName = 'ProductListHero';

export default ProductListHero;
