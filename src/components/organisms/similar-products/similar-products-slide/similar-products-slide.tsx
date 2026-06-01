import Image from 'components/atoms/image/image';
import InfoLabel from 'components/atoms/info-label/info-label';
import Typography from 'components/atoms/typography/typography';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import Link from 'components/utilities/link/link';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import styles from './similar-products-slide.module.scss';

export interface SimilarProductsSlideProps {
  category: string;
  image: AmplienceImagePayload;
  link: [BaseLink];
  name: string;
  tags?: {
    tagText: string;
  }[];
}

const SimilarProductsSlide = ({
  category,
  image,
  link,
  name,
  tags,
}: SimilarProductsSlideProps) => {
  return (
    <div className={styles.component}>
      <Link className={styles.cardLink} link={link?.[0]}>
        <div className={styles.cardHeader}>
          <p className={styles.title}>
            <Typography
              className={styles.ellipsis}
              tagStyle="headlineMedium"
              weight="bold"
            >
              {category}
            </Typography>
            <Typography className={styles.ellipsis} tagStyle="headlineMedium">
              {name}
            </Typography>
          </p>
          <div className={styles.tagsContainer}>
            {tags?.map(({ tagText }, index) => (
              <InfoLabel key={index}>{tagText}</InfoLabel>
            ))}
          </div>
        </div>
        <div className={styles.productImageContainer}>
          <Image
            alt={image.alt}
            className={styles.productImage}
            fill
            imageObject={image}
            {...generateImageSizes(10, 6, 5, 4, 4)}
          />
        </div>
      </Link>
    </div>
  );
};

SimilarProductsSlide.displayName = 'SimilarProductsSlide';

export default SimilarProductsSlide;
