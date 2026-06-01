import { motion, useScroll, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import ScrollFade from 'components/utilities/scroll-fade/scroll-fade';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import { ExplorePageCategories } from 'types/explore-pages';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Button from '../button/button';
import RangeLogo, { RangeIconName } from '../range-logo/range-logo';
import { HeroRangeTextContainer } from './hero-range-text-container/hero-range-text-container';
import styles from './hero-range.module.scss';

const ROOT_MARGIN = '-30% 0% -40% 0%';

export interface HeroRangeProps extends ModuleWrapperProps {
  bikeCategory?: ExplorePageCategories;
  doRecut?: boolean;
  imageObject: AmplienceImagePayload;
  leadParagraphs: {
    paragraphButton: BaseButton[];
    paragraphText: string;
  }[];
  rangeButton: BaseButton[];
  rangeIconReference?: {
    rangeIconsName: RangeIconName;
  }[];
  // Comes as an array but have just one item in it
  title: string;
}

const HeroRange = ({
  bikeCategory,
  doRecut,
  leadParagraphs,
  rangeButton,
  title,
  imageObject,
  color,
  rangeIconReference,
}: HeroRangeProps) => {
  const moduleRef = useRef<HTMLDivElement | null>(null);
  const { isBelowDesktopView = false } = useBreakpoints();
  const mainImage = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    offset: ['start center', 'start start'],
    target: mainImage,
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const {
    domNode: slide,
    isIntersecting: isIntersectingSlide,
    isViewed: isSlideViewed,
  } = useIntersectionObserver({
    rootMargin: ROOT_MARGIN,
    unObserveOnThreshold: 0.9,
  });

  const [isPastEndOfModule, setIsPastEndOfModule] = useState(false);

  useLayoutEffect(() => {
    const el = moduleRef.current;
    if (!el) return;

    const update = () => {
      const node = moduleRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const endOfModule = Math.abs(
        rect.top / (rect.height - window.innerHeight),
      );
      setIsPastEndOfModule(endOfModule > 1);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <ModuleWrapper className={styles.component} color={color} hero>
      <div ref={moduleRef} className={styles.stickyContainer}>
        <Container className={styles.breadcrumb}>
          <Row outerGutter={{ mobile: 'medium' }}>
            <Column>
              <MotionFade speed="speed-verySlow">
                <Breadcrumb />
              </MotionFade>
            </Column>
          </Row>
        </Container>
        <Row className={styles.titleRow}>
          <Column
            className={styles.titleContainer}
            width={{ desktop: 4, tablet: 6 }}
          >
            {rangeIconReference?.[0] && bikeCategory && (
              <MotionFade delay="speed-short" speed="speed-verySlow">
                <RangeLogo
                  ariaLabel={rangeIconReference[0].rangeIconsName}
                  ariaLevel={1}
                  categoryName={bikeCategory}
                  className={styles.rangeLogo}
                  rangeName={rangeIconReference[0].rangeIconsName}
                  role="heading"
                />
              </MotionFade>
            )}
            <MotionSlide direction="left-right" speed="speed-verySlow">
              <div className={styles.title}>
                <Typography
                  doRecut={doRecut}
                  tag={rangeIconReference?.[0] && bikeCategory ? 'h2' : 'h1'}
                  tagStyle="displayLarge"
                >
                  {title}
                </Typography>
              </div>
            </MotionSlide>
            {rangeButton?.[0]?.link?.linkText && (
              <MotionFade delay="speed-short" speed="speed-verySlow">
                <span>
                  <Button
                    link={rangeButton[0].link}
                    text={rangeButton[0].link?.linkText}
                  />
                </span>
              </MotionFade>
            )}
          </Column>
        </Row>
        <div ref={mainImage} className={styles.mainImage}>
          <motion.span
            className={styles.motionContainer}
            style={{
              height: '100%',
              opacity,
              scale,
              width: '100%',
            }}
          >
            <Image
              alt={imageObject?.alt}
              className={styles.image}
              fill
              imageObject={imageObject}
              {...generateImageSizes(12, 12, 12, 12, 12)}
              fetchPriority="high"
              priority
            />
          </motion.span>
          <ScrollFade
            className={styles.radial}
            elementRef={mainImage}
            fromRange={[0, 1]}
            observerOffset={['start center', 'start start']}
            opacityStartEnd={[0.15, 0]}
          />
        </div>
        {leadParagraphs?.length > 0 && (
          <ParallaxWrapper>
            <HeroRangeTextContainer
              isIntersectingSlide={
                isIntersectingSlide || (isBelowDesktopView && isPastEndOfModule)
              }
              isViewed={isSlideViewed}
              leadParagraphs={leadParagraphs}
              refItem={slide}
            />
          </ParallaxWrapper>
        )}
        {/* Gives space for text to scroll properly */}
        <div className={styles.slide} />
      </div>
    </ModuleWrapper>
  );
};

export default HeroRange;
