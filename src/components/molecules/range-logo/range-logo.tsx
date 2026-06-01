import classNames from 'classnames';
import React from 'react';
import * as rangeLogos from 'assets/icons/range-logos/range-icons';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import { ExplorePageCategories } from 'types/explore-pages';
import styles from './range-logo.module.scss';

export type RangeIconName = keyof typeof rangeLogos;

export interface RangeLogoProps {
  ariaLabel?: string;
  ariaLevel?: number;
  categoryName: ExplorePageCategories;
  className?: string;
  rangeName: RangeIconName;
  role?: string;
}

const RangeLogo = ({
  ariaLabel,
  ariaLevel,
  rangeName,
  className,
  categoryName,
  role,
}: RangeLogoProps) => {
  const IconCheck = rangeLogos[rangeName];

  if (!IconCheck || !categoryName) {
    return null;
  }

  const capitalizedRangeName = ariaLabel
    ? ariaLabel[0].toUpperCase() + ariaLabel.slice(1)
    : undefined;

  return (
    <div
      className={classNames(styles.component, styles[categoryName], className)}
    >
      <div
        aria-label={capitalizedRangeName}
        aria-level={ariaLevel}
        className={classNames(
          styles.maskedGradient,
          styles[`rangeName-${rangeName}`],
        )}
        role={role}
      >
        <ParallaxWrapper
          className={styles.animatedGradient}
          observerOffset={['-300%', '0%']}
          translateYStartEnd={'0%To100%'}
        />
      </div>
    </div>
  );
};

RangeLogo.displayName = 'RangeLogo';

export default RangeLogo;
