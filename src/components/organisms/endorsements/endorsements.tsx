import { useI18n } from 'next-localization';
import { useMemo } from 'react';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { trackEndorsementClick } from 'integrations/tracking/google-tag-manager/scripts';
import useSlider from 'libraries/hooks/use-slider';
import SliderNavigation from '../slider-navigation/slider-navigation';
import styles from './endorsements.module.scss';

interface EndorsementProps {
  byline: string;
  imageObject?: AmplienceImagePayload;
  link?: BaseLink[];
  quote: string;
  tagline?: string;
}

export interface EndorsementsProps extends ModuleWrapperProps {
  endorsements: {
    endorsement: EndorsementProps;
  }[];
}

export const Endorsement = ({
  byline,
  imageObject,
  link,
  quote,
  tagline,
}: EndorsementProps) => {
  return (
    <div className={styles.endorsement}>
      {imageObject?.diImage?.image && (
        <div className={styles.imageObjectWrapper}>
          <Image
            alt={imageObject.alt || ''}
            className={styles.imageObject}
            height={500}
            imageObject={imageObject}
            width={500}
          />
        </div>
      )}
      {tagline && (
        <Typography className={styles.tagline} tagStyle="headlineLarge">
          {tagline}
        </Typography>
      )}
      <Typography
        tag="blockquote"
        className={styles.quote}
        tagStyle="displaySmall"
      >
        “{quote}”
      </Typography>
      <div className={styles.bylineAndLink}>
        <Typography
          className={styles.byline}
          tagStyle="actionLarge"
          weight="bold"
        >
          {byline}
        </Typography>
        {link?.[0] && (
          <Button
            className={styles.button}
            link={link[0]}
            target={link[0].target}
            text={link[0].linkText}
            trackOnClick={(title, clickUrl) =>
              trackEndorsementClick({
                clickUrl,
                title,
              })
            }
            variant="Text"
          />
        )}
      </div>
    </div>
  );
};

const Endorsements = ({ color, endorsements, ...rest }: EndorsementsProps) => {
  const { t } = useI18n();
  const [emblaRef, emblaApi] = useSlider(
    {
      accessibility: {
        onUpdateAria: (api, currentSlide, totalSlides) => {
          const currentIndex = api.selectedScrollSnap();
          const item =
            endorsements?.[currentIndex % (endorsements?.length ?? 1)];
          const parts = [
            t('global.progressSentence', {
              currentSlide,
              totalSlides,
            }),
          ];
          if (item?.endorsement?.tagline) parts.push(item.endorsement.tagline);
          if (item?.endorsement?.quote) parts.push(item.endorsement.quote);
          if (item?.endorsement?.byline) parts.push(item.endorsement.byline);
          return parts.filter(Boolean).join('. ');
        },
        totalSlides: endorsements?.length ?? 0,
      },
    },
    { loop: true },
  );

  const total = endorsements?.length ?? 0;
  const items = useMemo(() => {
    if (total > 0) {
      return endorsements!.map((item, index) => (
        <div
          key={index}
          aria-label={t('global.progressSentence', {
            currentSlide: index + 1,
            totalSlides: total,
          })}
          className={styles.slide}
          role="group"
        >
          <Endorsement {...item.endorsement} />
        </div>
      ));
    }
  }, [endorsements, total, t]);

  return (
    <ModuleWrapper {...rest} color={color || 'primary'}>
      <div className={styles.component}>
        <ParallaxWrapper
          minOpacity={0}
          observerOffset={'startEndStartCenter'}
          translateYStartEnd={'15vhTo0vh'}
        >
          <div aria-label={t('carouselRegion.endorsements')} role="region">
            {endorsements?.length > 1 && emblaApi ? (
              <SliderNavigation
                api={emblaApi}
                className={styles.sliderNavigation}
                labels={{
                  goToNext: t('ugcEndorsements.endorsementNext'),
                  goToPrevious: t('ugcEndorsements.endorsementPrevious'),
                }}
                wrapContent
              >
                <div ref={emblaRef} className={styles.slider}>
                  <div className={styles.container}>{items}</div>
                </div>
              </SliderNavigation>
            ) : (
              <div
                ref={endorsements?.length > 1 ? emblaRef : undefined}
                className={styles.slider}
              >
                <div className={styles.container}>{items}</div>
              </div>
            )}
          </div>
        </ParallaxWrapper>
      </div>
    </ModuleWrapper>
  );
};

Endorsements.displayName = 'Endorsements';

export default Endorsements;
