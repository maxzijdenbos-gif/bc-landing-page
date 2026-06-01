import { useI18n } from 'next-localization';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import styles from './shop-series-card.module.scss';

interface ShopSeriesCardElementCardProps {
  fromPrice?: string;
  imageObject: AmplienceImagePayload;
  link?: string;
  numberOfVariants?: string;
  onCustomizeBikeClick?: () => void;
  onCustomizeFrameClick?: () => void;
  seriesDescription: string;
  seriesName: string;
  tags: string[];
}

const ShopSeriesCard = ({
  fromPrice,
  imageObject,
  link,
  onCustomizeBikeClick,
  onCustomizeFrameClick,
  seriesDescription,
  seriesName,
}: ShopSeriesCardElementCardProps) => {
  const { t } = useI18n();

  return (
    <div
      aria-label={t('global.product')}
      className={styles.component}
      role="group"
    >
      <div className={styles.imageContainer}>
        <Image
          alt={imageObject?.alt}
          className={styles.image}
          fill
          imageObject={imageObject}
          {...generateImageSizes(5, 5, 5, 5, 5)}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <Typography className={styles.name} tag="h2" tagStyle="displaySmall">
            {seriesName}
          </Typography>
          <Typography tag="p" tagStyle="bodyLarge">
            {seriesDescription}
          </Typography>
        </div>
        <div className={styles.ctaContainer}>
          {!!fromPrice && (
            <Typography
              className={styles.fromPrice}
              tag="p"
              tagStyle="bodyXLarge"
            >
              {t('global.pricesFrom', { price: fromPrice }) ||
                `From ${fromPrice}`}
            </Typography>
          )}
          {link && (
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                innerClassName={styles.buttonInner}
                onClick={onCustomizeFrameClick}
                size="large"
                textClassName={styles.buttonText}
                text="Customize frame"
                variant="Secondary"
              />
              <Button
                className={styles.button}
                innerClassName={styles.buttonInner}
                onClick={onCustomizeBikeClick}
                size="large"
                textClassName={styles.buttonText}
                text="Customize bike"
                variant="Primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ShopSeriesCard.displayName = 'ShopSeriesCard';

export default ShopSeriesCard;
