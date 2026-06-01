import classNames from 'classnames';
import React from 'react';
import AuthorAndDate, {
  AuthorName,
  Date,
} from 'components/atoms/author-and-date/author-and-date';
import Image from 'components/atoms/image/image';
import InfoLabel from 'components/atoms/info-label/info-label';
import Typography from 'components/atoms/typography/typography';
import AnchorMenu, {
  AnchorMenuProps,
  MIN_ANCHOR_ITEMS,
} from 'components/molecules/anchor-menu/anchor-menu';
import Breadcrumb from 'components/molecules/breadcrumb/breadcrumb';
import LeadParagraph from 'components/molecules/lead-paragraph/lead-paragraph';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import {
  AmplienceImagePayload,
  ContentMeta,
} from 'integrations/content/amplience/types/content-types';
import styles from './hero-guides-and-articles.module.scss';

export interface HeroGuidesAndArticlesProps extends ModuleWrapperProps {
  /** An array of anchor linkt to show in the anchor menu bar */
  anchorList?: AnchorMenuProps['anchorList'];
  /** The name of the author */
  authorName?: AuthorName;
  /** Unused in component date. For use for metadata elsewhere ( newsArticleSchema ) */
  dateModified?: Date;
  /** The date of to display next to author. Might be delivered as a timestamp ?? */
  datePublished?: Date;
  /** Display the headline as the Recut font (first word) */
  doRecut: boolean;
  /** Whether or not to display the brand watermark */
  doWaterMark: boolean;
  /** The text to show as a headline */
  headline: string;
  /** The Amplience image object to construct image from */
  imageObject?: AmplienceImagePayload;
  /** The introduction text for the hero */
  leadParagraph?: string;
  /** The theme watermark image to display if doWaterMark is true **/
  waterMark: {
    _meta: ContentMeta;
    imageObject?: AmplienceImagePayload;
    imageObjectMobile?: AmplienceImagePayload;
  };
}

const HeroGuidesAndArticles = ({
  anchorList,
  authorName,
  color,
  doRecut,
  datePublished,
  doWaterMark,
  headline,
  imageObject,
  leadParagraph,
  tags,
  waterMark,
  schemaData,
}: HeroGuidesAndArticlesProps) => {
  const componentRef = React.useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <ModuleWrapper
        ref={componentRef}
        className={classNames(styles.component, {
          [styles.hasAnchorMenu]:
            anchorList?.length && anchorList.length >= MIN_ANCHOR_ITEMS,
        })}
        color={color}
      >
        <div className={styles.contentContainer}>
          <Container>
            <Row outerGutter={{ laptop: 'none', mobile: 'medium' }}>
              <Column
                className={styles.contentColumn}
                offset={{ desktop: 2, laptop: 1 }}
                width={{ desktop: 6, laptop: 7 }}
              >
                <MotionFade>
                  <Breadcrumb className={styles.breadcrumb} />
                </MotionFade>
                <MotionSlide direction="left-right">
                  <div>
                    <Typography
                      doRecut={doRecut}
                      tag="h1"
                      tagStyle="displayLarge"
                      weight="bold"
                    >
                      {headline}
                    </Typography>
                  </div>
                </MotionSlide>

                {(authorName || datePublished) && (
                  <AuthorAndDate
                    authorName={
                      schemaData?.author?.[0]?.authorName || undefined
                    }
                    className={styles.authorAndDate}
                    publishingDate={datePublished}
                  />
                )}

                {!!tags?.length && (
                  <div className={styles.labelContainer}>
                    {tags.map(
                      (tag, tagIndex) =>
                        !!tag?.tag?.[0].tagText &&
                        !tag.hide && (
                          <InfoLabel
                            key={tagIndex}
                            backgroundColor="tint"
                            size="large"
                          >
                            {tag.tag[0].tagText}
                          </InfoLabel>
                        ),
                    )}
                  </div>
                )}
              </Column>
            </Row>
          </Container>
          {doWaterMark &&
            imageObject?.diImage?.image?.name &&
            waterMark.imageObject?.diImage?.image?.name &&
            waterMark.imageObjectMobile?.diImage?.image?.name && (
              <React.Fragment>
                <div className={styles.waterMark}>
                  <Image
                    alt={waterMark.imageObject.alt}
                    className={styles.waterMarkImage}
                    height={1000}
                    imageObject={waterMark.imageObject}
                    loading="eager"
                    priority={true}
                    quality={80}
                    width={1400}
                  />
                </div>
                <div className={styles.waterMarkTablet}>
                  <Image
                    alt={waterMark.imageObjectMobile.alt}
                    className={styles.waterMarkImage}
                    height={1000}
                    imageObject={waterMark.imageObjectMobile}
                    loading="eager"
                    quality={80}
                    width={1400}
                  />
                </div>
              </React.Fragment>
            )}
        </div>
        {imageObject?.diImage?.image?.name && (
          <div className={styles.overflowContainer} color={color}>
            <ParallaxWrapper
              className={styles.imageContainer}
              elementRef={componentRef}
              translateYStartEnd={['-10%', '10%']}
            >
              <Image
                alt={imageObject.alt}
                className={styles.image}
                fill
                imageObject={imageObject}
                fetchPriority="high"
                priority
                quality={80}
              />
            </ParallaxWrapper>
          </div>
        )}
      </ModuleWrapper>
      {anchorList && (
        <AnchorMenu
          anchorList={anchorList}
          pullIntoTopElement
          topElement={componentRef}
        />
      )}
      {leadParagraph && (
        <ModuleWrapper color={color}>
          <Container className={styles.leadParagraph}>
            <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
              <Column
                offset={{
                  laptop: 3,
                  tablet: 1,
                }}
                width={{
                  laptop: 6,
                  mobile: 12,
                  tablet: 10,
                }}
              >
                <LeadParagraph text={leadParagraph} />
              </Column>
            </Row>
          </Container>
        </ModuleWrapper>
      )}
    </React.Fragment>
  );
};

HeroGuidesAndArticles.displayName = 'HeroGuidesAndArticles';

export default HeroGuidesAndArticles;
