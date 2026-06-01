import classNames from 'classnames';
import { useMemo } from 'react';
import React from 'react';
import CrossBrandNavigationItem from 'components/molecules/cross-brand-navigation-item/cross-brand-navigation-item';
import { CrossBrandLink } from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import styles from './cross-brand-navigation.module.scss';

export interface CrossBrandNavigationProps {
  asListItems?: boolean;
  brands: CrossBrandLink[];
  firstListItemClassName?: string;
  lastListItemClassName?: string;
}

const ownBrand = process.env.NEXT_PUBLIC_THEME_NAME;
const enforcedOrder: BrandNames[] = ['giant', 'liv', 'momentum'];

const getFilteredAndSortedBrands = (brands: CrossBrandLink[]) => {
  const filtered = (brands ?? []).filter(
    (b) => b.brandDefinition !== ownBrand && b.brandDefinition,
  );
  return [...filtered].sort(
    (a, b) =>
      enforcedOrder.indexOf(a.brandDefinition) -
      enforcedOrder.indexOf(b.brandDefinition),
  );
};

const CrossBrandNavigation = ({
  brands,
  asListItems,
  firstListItemClassName,
  lastListItemClassName,
}: CrossBrandNavigationProps) => {
  const sortedBrands = useMemo(
    () => getFilteredAndSortedBrands(brands ?? []),
    [brands],
  );

  if (asListItems) {
    const lastIndex = sortedBrands.length - 1;
    return (
      <React.Fragment>
        {sortedBrands.map((brand, index) => (
          <li
            key={brand.brandDefinition}
            className={classNames(
              index === 0 ? firstListItemClassName : undefined,
              index === lastIndex ? lastListItemClassName : undefined,
            )}
          >
            <CrossBrandNavigationItem brand={brand} />
          </li>
        ))}
      </React.Fragment>
    );
  }

  return (
    <ul className={styles.component}>
      {sortedBrands.map((brand) => (
        <li key={brand.brandDefinition}>
          <CrossBrandNavigationItem brand={brand} />
        </li>
      ))}
    </ul>
  );
};

CrossBrandNavigation.displayName = 'CrossBrandNavigation';

export default CrossBrandNavigation;
