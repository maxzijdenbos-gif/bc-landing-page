import React from 'react';
import Skeleton from 'components/atoms/skeleton/skeleton';
import styles from './main-navigation-shopping-cart-loading.module.scss';

/** Skeleton list for the cart drawer body while cart is loading. */
export function MainNavigationShoppingCartLoadingBody() {
  return (
    <ul aria-hidden className={styles.component} role="presentation">
      {[1, 2, 3].map((i) => (
        <li key={i} className={styles.itemSkeleton}>
          <Skeleton
            animation="pulse"
            className={styles.itemSkeletonImage}
            height={128}
            variant="rectangular"
            width={128}
          />
          <div className={styles.itemSkeletonDetails}>
            <Skeleton
              animation="pulse"
              className={styles.itemSkeletonLine}
              variant="text"
            />
            <Skeleton
              animation="pulse"
              className={styles.itemSkeletonLine}
              variant="text"
              width="60%"
            />
            <Skeleton
              animation="pulse"
              className={styles.itemSkeletonLine}
              variant="text"
              width="40%"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

MainNavigationShoppingCartLoadingBody.displayName =
  'MainNavigationShoppingCartLoadingBody';

/** Skeleton for the cart drawer footer while cart is loading. */
export function MainNavigationShoppingCartLoadingFooter() {
  return (
    <Skeleton
      animation="pulse"
      className={styles.componentFooter}
      height={48}
      variant="rectangular"
    />
  );
}

MainNavigationShoppingCartLoadingFooter.displayName =
  'MainNavigationShoppingCartLoadingFooter';
