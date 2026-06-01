/* we need to detect hover of the card. No keyboard detection needed */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React, { useState } from 'react';
import * as socialIcons from 'assets/icons/social/social';
import Icon from 'components/atoms/icon/icon';
import Image from 'components/atoms/image/image';
import InfoLabel from 'components/atoms/info-label/info-label';
import Typography from 'components/atoms/typography/typography';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import Link from 'components/utilities/link/link';
import MotionTrackSlide from 'components/utilities/motion/hovers/motion-track-slide/motion-track-slide';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { trackCardModuleClick } from 'integrations/tracking/google-tag-manager/scripts';
import styles from './teaser-list-element.module.scss';

type SocialIcons = keyof typeof socialIcons;

type SharedTeaserListElementProps = {
  imageObject: AmplienceImagePayload;
  teaserHeadline: string;
};

export interface ContentTeaserListElementProps extends SharedTeaserListElementProps {
  link: [BaseLink];
  socialMediaIcon?: null;
  teaserTags?: string[];
  teaserType: 'content';
}

interface SocialTeaserListElementProps extends SharedTeaserListElementProps {
  link: BaseLink['externalLink'];
  socialMediaIcon: SocialIcons;
  teaserTags?: null;
  teaserType: 'social';
}

type TeaserElement =
  | ContentTeaserListElementProps
  | SocialTeaserListElementProps;

export type TeaserListElementProps = {
  className?: string;
  isHovered?: boolean;
  nonInteractive?: boolean;
  onMouseEnterCallback?: () => void;
  onMouseLeaveCallback?: () => void;
  teaserElement: TeaserElement;
};

const TeaserListElement = ({
  className,
  onMouseEnterCallback,
  onMouseLeaveCallback,
  isHovered,
  nonInteractive = false,
  teaserElement,
}: TeaserListElementProps) => {
  const [triggerAnimation, setTriggerAnimation] = useState<boolean | null>(
    null,
  );

  const innerContent = (
    <>
      <div className={styles.gradientOverlay} />
      <Image
        alt=""
        className={styles.contentTeaserImage}
        fill
        imageObject={teaserElement.imageObject}
        {...generateImageSizes(10, 10, 4, 4, 4)}
      />
      <div className={styles.contentTeaserContent}>
        {!!teaserElement.teaserTags?.length && (
          <div className={styles.contentTeaserTags}>
            {teaserElement.teaserTags.map((tag, index) => (
              <InfoLabel
                key={`tag-${index}`}
                backgroundColor="contrast"
                variant="blur"
              >
                {tag}
              </InfoLabel>
            ))}
          </div>
        )}
        {teaserElement.socialMediaIcon && (
          <React.Fragment>
            <Icon
              className={styles.socialIcon}
              name={teaserElement.socialMediaIcon}
              size={24}
              hidden
            />
            <Typography isScreenReaderOnly tag="span">
              {teaserElement.socialMediaIcon.replace('Circle', '')}
            </Typography>
          </React.Fragment>
        )}
        <Typography
          className={styles.contentTeaserHeadline}
          tag="span"
          tagStyle="headlineMedium"
          weight="bold"
        >
          {teaserElement.teaserHeadline}
        </Typography>
        {!nonInteractive && (
          <MotionTrackSlide
            className={styles.contentTeaserCtaIcon}
            doAnimate={triggerAnimation}
          >
            <Icon hidden name="ArrowRight_24" />
          </MotionTrackSlide>
        )}
      </div>
    </>
  );

  if (nonInteractive) {
    return (
      <div className={classNames(styles.component)}>
        <div className={classNames(className, styles.contentTeaserElement)}>
          {innerContent}
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.component, {
        [styles.isHovered]: isHovered,
      })}
      onMouseEnter={() => {
        onMouseEnterCallback && onMouseEnterCallback();
        setTriggerAnimation(!triggerAnimation);
      }}
      onMouseLeave={() => {
        onMouseLeaveCallback && onMouseLeaveCallback();
      }}
    >
      <Link
        className={classNames(className, styles.contentTeaserElement)}
        link={
          teaserElement.teaserType === 'content'
            ? teaserElement.link?.[0]
            : { externalLink: teaserElement.link, target: '_blank' }
        }
        rel={
          teaserElement.teaserType === 'content'
            ? undefined
            : 'noreferrer noopener'
        }
        trackOnClick={(_, clickUrl) =>
          trackCardModuleClick({
            cardType: 'teaser-list',
            clickUrl,
            title: teaserElement.teaserHeadline,
          })
        }
      >
        <div className={styles.gradientOverlay} />
        <Image
          alt=""
          className={styles.contentTeaserImage}
          fill
          imageObject={teaserElement.imageObject}
          {...generateImageSizes(10, 10, 4, 4, 4)}
        />
        <div className={styles.contentTeaserContent}>
          {!!teaserElement.teaserTags?.length && (
            <div className={styles.contentTeaserTags}>
              {teaserElement.teaserTags.map((tag, index) => (
                <InfoLabel
                  key={`tag-${index}`}
                  backgroundColor="contrast"
                  variant="blur"
                >
                  {tag}
                </InfoLabel>
              ))}
            </div>
          )}
          {teaserElement.socialMediaIcon && (
            <React.Fragment>
              <Icon
                className={styles.socialIcon}
                name={teaserElement.socialMediaIcon}
                size={24}
                hidden
              />
              <Typography isScreenReaderOnly tag="span">
                {teaserElement.socialMediaIcon.replace('Circle', '')}
              </Typography>
            </React.Fragment>
          )}
          <Typography
            className={styles.contentTeaserHeadline}
            tag="span"
            tagStyle="headlineMedium"
            weight="bold"
          >
            {teaserElement.teaserHeadline}
          </Typography>
          <MotionTrackSlide
            className={styles.contentTeaserCtaIcon}
            doAnimate={triggerAnimation}
          >
            <Icon hidden name="ArrowRight_24" />
          </MotionTrackSlide>
        </div>
      </Link>
    </div>
  );
};

TeaserListElement.displayName = 'TeaserListElement';

export default TeaserListElement;
