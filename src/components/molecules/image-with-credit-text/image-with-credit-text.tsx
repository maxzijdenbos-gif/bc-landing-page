import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'components/atoms/image/image';
import RichText from 'components/atoms/rich-text/rich-text';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import Row from 'components/utilities/row/row';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import { LayoutBreakpoints } from 'types/layout';
import styles from './image-with-credit-text.module.scss';

export interface ImageWithCreditTextProps
  extends
    ModuleWrapperProps,
    Pick<
      ImageProps,
      'imageObject' | 'imageObjectMobile' | 'alt' | 'fallbackSrc'
    > {
  color?: BackgroundColor;
  creditText: string;
}

const GRID_COLUMNS = 12;

const ImageWithCreditText = ({
  anchorTarget,
  color,
  imageObject,
  imageObjectMobile,
  fallbackSrc,
  alt,
  creditText,
}: ImageWithCreditTextProps) => {
  const imageRef = useRef(null);

  const { isTabletOrAbove } = useBreakpoints();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setHasMounted(true));
  }, []);

  const selectedImage = hasMounted
    ? isTabletOrAbove
      ? imageObject
      : imageObjectMobile
    : imageObject;

  const finalImage = selectedImage?.diImage?.image
    ? selectedImage
    : imageObject;

  const oneColumnWidth = isTabletOrAbove
    ? `${LayoutBreakpoints.desktop / GRID_COLUMNS}px`
    : `${100 / GRID_COLUMNS}vw`;

  const { scrollYProgress } = useScroll({
    axis: 'y',
    offset: ['start 80vh', 'center center'],
    target: imageRef,
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(5vh ${oneColumnWidth})`,
      `inset(0vh ${isTabletOrAbove ? '0px' : '0vw'})`,
    ],
  );

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={classNames(styles.component)}
      color={color}
    >
      <Container>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              desktop: 2,
              laptop: 1,
              mobile: 0,
              tablet: 1,
            }}
            width={{
              desktop: 8,
              laptop: 10,
              mobile: 12,
              tablet: 10,
            }}
          >
            {finalImage && (
              <motion.div style={{ clipPath }}>
                <div
                  ref={imageRef}
                  className={classNames(styles.imageWrapper)}
                  {...(finalImage?.dimensions?.width &&
                    finalImage?.dimensions?.height && {
                      style: {
                        aspectRatio: `${finalImage.dimensions.width}/${finalImage.dimensions.height}`,
                      },
                    })}
                >
                  <Image
                    alt={finalImage?.alt || alt || creditText}
                    className={styles.image}
                    fallbackSrc={fallbackSrc}
                    fill
                    imageObject={finalImage}
                    {...generateImageSizes(12, 10, 10, 10, 8)}
                  />
                </div>
              </motion.div>
            )}
          </Column>
        </Row>
        {creditText && (
          <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
            <Column
              className={styles.creditText}
              offset={{
                desktop: 2,
                laptop: 1,
                mobile: 0,
                tablet: 1,
              }}
              width={{
                desktop: 8,
                laptop: 10,
                mobile: 12,
                tablet: 10,
              }}
            >
              <RichText text={creditText} />
            </Column>
          </Row>
        )}
      </Container>
    </ModuleWrapper>
  );
};

ImageWithCreditText.displayName = 'ImageWithCreditText';

export default ImageWithCreditText;
