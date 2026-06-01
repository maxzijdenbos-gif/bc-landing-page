import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Icon from 'components/atoms/icon/icon';
import Image from 'components/atoms/image/image';
import InfoLabel from 'components/atoms/info-label/info-label';
import Typography from 'components/atoms/typography/typography';
import { RangeIconName } from 'components/molecules/range-logo/range-logo';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import ScrollFade from 'components/utilities/scroll-fade/scroll-fade';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { isIos17OrLower } from 'libraries/utilities/user-agent';
import ButtonList, { ButtonListProps } from '../button-list/button-list';
import styles from './content-highlight.module.scss';

type SharedContentHighlightProps = {
  buttonGroup?: BaseButton[];
  label?: string;
  paragraph: string;
} & ModuleWrapperProps;

type ContentContentHighlightProps = {
  backgroundImageObject: AmplienceImagePayload;
  contentType: 'content';
  headline: string;
  productImageObject?: null;
  rangeLogoReference?: null;
  theme?: null;
} & SharedContentHighlightProps;

type ProductContentHighlightProps = {
  backgroundImageObject?: AmplienceImagePayload;
  contentType: 'product';
  headline?: string;
  productImageObject: AmplienceImagePayload;
  rangeLogoReference?: [{ rangeIconsName: RangeIconName }];
  theme: 'quinary' | 'secondary';
} & SharedContentHighlightProps;

export type ContentHighlightProps =
  | ContentContentHighlightProps
  | ProductContentHighlightProps;

const ContentHighlight = ({
  anchorTarget,
  color,
  contentType,
  backgroundImageObject,
  buttonGroup,
  label,
  paragraph,
  productImageObject,
  theme,
  headline,
  rangeLogoReference,
  ...rest
}: ContentHighlightProps) => {
  const textColumnRef = useRef<HTMLDivElement>(null);
  const [textColumnHeight, setTextColumnHeight] = useState<number | null>(null);
  const [needsMaxHeightFix, setNeedsMaxHeightFix] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setNeedsMaxHeightFix(isIos17OrLower()));
  }, []);

  useEffect(() => {
    if (!needsMaxHeightFix) return;
    const el = textColumnRef.current?.parentElement;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setTextColumnHeight(entry.contentRect.height);
    });
    observer.observe(el);
    queueMicrotask(() =>
      setTextColumnHeight(el.getBoundingClientRect().height),
    );

    return () => observer.disconnect();
  }, [needsMaxHeightFix]);

  return (
    <ModuleWrapper
      {...rest}
      anchorTarget={anchorTarget}
      className={classNames(styles.component, {
        [styles.isProduct]: contentType === 'product',
        [styles.isQuinary]: theme === 'quinary',
        [styles.hasBackground]: backgroundImageObject?.diImage?.image,
      })}
      color={color}
    >
      <Container className={styles.container}>
        {backgroundImageObject ? (
          <Image
            alt={backgroundImageObject.alt}
            className={styles.backgroundImage}
            data-testid="background-image"
            fill
            imageObject={backgroundImageObject}
            {...generateImageSizes(12, 12, 12, 12, 12)}
          />
        ) : (
          <div className={styles.gradient} />
        )}
        <ScrollFade
          className={styles.overlay}
          fromRange={[0, 1]}
          opacityStartEnd={[1, 0.7]}
        />
        <Row
          className={styles.rowInner}
          classNameOuter={styles.rowOuter}
          outerGutter={{
            laptop: 'none',
            mobile: 'medium',
            smallLaptop: 'medium',
            tablet: 'none',
          }}
        >
          {contentType === 'product' && productImageObject && (
            <Column
              className={styles.productImageColumn}
              offset={{ laptop: 1, smallLaptop: 0, tablet: 2 }}
              width={{ laptop: 4, mobile: 12, smallLaptop: 5, tablet: 8 }}
            >
              <ParallaxWrapper
                className={styles.productImageWrapper}
                observerOffset={'startEndStartCenter'}
                translateYStartEnd={['20vh', '0vh']}
              >
                <Image
                  alt={productImageObject.alt}
                  className={styles.productImage}
                  fill
                  imageObject={productImageObject}
                  {...generateImageSizes(12, 8, 5, 4, 4)}
                />
              </ParallaxWrapper>
            </Column>
          )}
          <Column
            className={styles.textColumn}
            offset={{
              smallLaptop:
                contentType === 'product' && productImageObject ? 1 : 6,
              tablet: 1,
            }}
            width={{
              laptop: 4,
              mobile: 12,
              smallLaptop: 5,
              tablet: 8,
            }}
          >
            <ParallaxWrapper
              className={styles.textWrapper}
              elementRef={textColumnRef}
              observerOffset={'startEndStartCenter'}
              style={
                needsMaxHeightFix && textColumnHeight !== null
                  ? { maxHeight: textColumnHeight }
                  : undefined
              }
              translateYStartEnd={'15vhTo0vh'}
            >
              {label && (
                <div className={styles.labelContainer}>
                  <InfoLabel>{label}</InfoLabel>
                </div>
              )}
              {contentType === 'product' &&
                rangeLogoReference?.[0]?.rangeIconsName && (
                  <div
                    aria-label={`${rangeLogoReference[0].rangeIconsName}`}
                    aria-level={2}
                    className={styles.logo}
                    data-testid={`${rangeLogoReference[0].rangeIconsName}-logo`}
                    role="heading"
                  >
                    <Icon
                      className={styles.rangeIcon}
                      name={rangeLogoReference[0].rangeIconsName}
                      preserveAspectRatio="xMinYMin meet"
                      width={'100%'}
                      hidden
                    />
                  </div>
                )}
              {(headline || paragraph) && (
                <div className={styles.textContainer}>
                  {headline && (
                    <Typography
                      tag={
                        contentType === 'product' &&
                        rangeLogoReference?.[0]?.rangeIconsName
                          ? 'h3'
                          : 'h2'
                      }
                      tagStyle="headlineLarge"
                      weight="bold"
                    >
                      {headline}
                    </Typography>
                  )}
                  {paragraph && <Typography tag="p">{paragraph}</Typography>}
                </div>
              )}
              {buttonGroup && (
                <ButtonList
                  buttonInnerClassName={styles.button}
                  buttons={
                    buttonGroup?.map((button) => ({
                      ...button,
                      lineBreakBefore: true,
                      style: 'Secondary',
                    })) as ButtonListProps['buttons']
                  }
                />
              )}
            </ParallaxWrapper>
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

ContentHighlight.displayName = 'ContentHighlight';

export default ContentHighlight;
