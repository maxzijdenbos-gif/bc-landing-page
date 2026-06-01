import classNames from 'classnames';
import Icon from 'components/atoms/icon/icon';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import { RangeIconName } from 'components/molecules/range-logo/range-logo';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { trackCardModuleClick } from 'integrations/tracking/google-tag-manager/scripts';
import styles from './entry-card.module.scss';

const NUMBER_OF_CARDS_FOR_TYPOGRAPHY_CHANGE = 4;

export interface EntryCardProps {
  backgroundImageObject: AmplienceImagePayload;
  button?: BaseLink[];
  cardVariant: 'ranges' | 'generic';
  className?: string;
  headline?: string;
  onMouseEnterCallback?: () => void;
  onMouseLeaveCallback?: () => void;
  rangeLogoReference?: {
    rangeIconsName: RangeIconName;
  }[];
  // Comes as an array but have just one item in it
  totalCards: number;
}

const EntryCard = ({
  backgroundImageObject,
  button,
  className,
  cardVariant,
  headline,
  rangeLogoReference,
  onMouseEnterCallback,
  onMouseLeaveCallback,
  totalCards,
}: EntryCardProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classNames(styles.component, className, {
        [styles.isDualCard]: totalCards === 2,
      })}
      onMouseEnter={() => {
        onMouseEnterCallback?.();
      }}
      onMouseLeave={() => {
        onMouseLeaveCallback?.();
      }}
    >
      <Image
        alt={backgroundImageObject.alt}
        className={styles.backgroundImage}
        fill
        imageObject={backgroundImageObject}
        {...generateImageSizes(
          10,
          10,
          totalCards === 2 ? 6 : 5,
          totalCards === 2 ? 5 : 12 / 3,
          totalCards === 2 ? 5 : 12 / 4,
        )}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          {cardVariant === 'ranges' &&
            rangeLogoReference?.[0]?.rangeIconsName && (
              <div
                aria-label={`${rangeLogoReference[0].rangeIconsName}`}
                aria-level={3}
                className={styles.logo}
                role="heading"
              >
                <Icon
                  className={styles.rangeIcon}
                  name={rangeLogoReference[0].rangeIconsName}
                  width={'100%'}
                  hidden
                />
              </div>
            )}
          {cardVariant === 'generic' && (
            <Typography
              className={styles.headline}
              tag="h3"
              tagStyle={
                totalCards < NUMBER_OF_CARDS_FOR_TYPOGRAPHY_CHANGE
                  ? 'displaySmall'
                  : 'displayXSmall'
              }
              weight="heavy"
            >
              {headline}
            </Typography>
          )}
        </div>
        {button?.[0] && (
          <Button
            innerClassName={styles.button}
            link={button[0]}
            size="small"
            text={button[0]?.linkText}
            trackOnClick={(_, clickUrl) =>
              trackCardModuleClick({
                cardType: 'entry-cards-list',
                clickUrl,
                title: headline || rangeLogoReference?.[0]?.rangeIconsName,
              })
            }
            variant="Tertiary"
          />
        )}
      </div>
    </div>
  );
};

EntryCard.displayName = 'EntryCard';

export default EntryCard;
