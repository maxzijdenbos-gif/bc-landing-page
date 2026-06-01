import classNames from 'classnames';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import { ProductSeriesElement } from '../product-carousel';
import styles from './product-carousel-slide.module.scss';

interface ProductSeriesCarouselSlideProps extends ProductSeriesElement {
  'aria-label'?: string;
  initAnimation?: boolean;
  isOverlay?: boolean;
  lastItem?: boolean;
  role?: string;
  // Used only to create scale animation
  scaleSelectorClassName: string;
  secondItem?: boolean;
}

const ProductSeriesCarouselSlide = ({
  'aria-label': ariaLabel,
  description,
  imageObject,
  initAnimation,
  isOverlay,
  lastItem,
  productHeadline,
  role,
  scaleSelectorClassName,
  secondItem,
  titleLink,
}: ProductSeriesCarouselSlideProps) => {
  return (
    <div
      aria-label={ariaLabel}
      className={classNames(styles.component, isOverlay && styles.isOverlay)}
      role={role}
    >
      {imageObject && (
        <div className={styles.imageContainer}>
          {!isOverlay && (
            <Image
              alt={imageObject.alt || ''}
              className={classNames(styles.image, scaleSelectorClassName, [
                { [styles.lastItem]: lastItem },
                { [styles.lastItemAnimation]: lastItem && initAnimation },
                { [styles.secondItem]: secondItem },
                { [styles.secondItemAnimation]: secondItem && initAnimation },
              ])}
              fill
              imageObject={imageObject}
              {...generateImageSizes(9, 9, 6, 6, 6)}
            />
          )}
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <Typography tag="h2" tagStyle="displayXSmall" weight="heavy">
            {productHeadline}
          </Typography>
        </div>
        <Typography
          className={styles.description}
          tag="p"
          tagStyle="bodyMedium"
        >
          {description}
        </Typography>

        {isOverlay ? (
          <Button
            className={styles.link}
            data-action-target
            link={titleLink?.[0]}
            text={titleLink?.[0].linkText}
            variant="Text"
          />
        ) : (
          <div className={styles.link}>{titleLink?.[0]?.linkText}</div> // Placeholder to ensure the same height as the overlay
        )}
      </div>
    </div>
  );
};

ProductSeriesCarouselSlide.displayName = 'ProductSeriesCarouselSlide';
export default ProductSeriesCarouselSlide;
