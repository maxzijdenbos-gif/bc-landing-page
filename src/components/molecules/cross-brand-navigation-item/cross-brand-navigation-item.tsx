import classNames from 'classnames';
import * as Logos from 'assets/logos/logos';
import Typography from 'components/atoms/typography/typography';
import Link from 'components/utilities/link/link';
import { CrossBrandLink } from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import { trackNavigationClick } from 'integrations/tracking/google-tag-manager/scripts';
import styles from './cross-brand-navigation-item.module.scss';

export interface CrossBrandNavigationItemProps {
  /** Cross brand item to display */
  brand: CrossBrandLink;
}

const DEFAULT_LOGO_HEIGHT = 16;
// Needs to do the following because safari does not respect 100% width in svg
const svgWidth: Record<BrandNames, number> = {
  giant: 127,
  liv: 42,
  momentum: 101,
};

const CrossBrandNavigationItem = ({ brand }: CrossBrandNavigationItemProps) => {
  const IconComponent = Logos[brand.brandDefinition];

  return (
    <Link
      className={classNames(styles.component, styles[brand.brandDefinition])}
      link={brand.crossBrandLink[0]}
      onClick={() =>
        trackNavigationClick({
          clickText: brand.crossBrandLink[0]?.linkText,
          title: 'burger menu',
          title1: 'n/a',
        })
      }
      target={brand.crossBrandLink[0]?.target ?? ''}
      title={brand.crossBrandImageAltText}
    >
      <div>
        <IconComponent
          aria-label={brand.crossBrandImageAltText}
          height={DEFAULT_LOGO_HEIGHT}
          role="img"
          width={svgWidth[brand.brandDefinition]}
        />
      </div>
      <Typography tagStyle="bodyMedium" weight="semiBold">
        {brand.crossBrandLink[0]?.linkText}
      </Typography>
    </Link>
  );
};

CrossBrandNavigationItem.displayName = 'CrossBrandNavigationItem';

export default CrossBrandNavigationItem;
