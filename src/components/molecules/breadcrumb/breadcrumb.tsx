import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import Link from 'components/utilities/link/link';
import HierarchyLinksContext from 'libraries/contexts/hierarchy-links-context';
import useWindowSize from 'libraries/hooks/dom/use-window-size';
import styles from './breadcrumb.module.scss';

export interface BreadcrumbProps {
  centerItems?: boolean;
  className?: string;
  doGradientOnOverflow?: boolean;
}

const Breadcrumb = ({
  centerItems,
  className,
  doGradientOnOverflow = true,
}: BreadcrumbProps) => {
  const scrollWrapper = useRef<HTMLOListElement>(null);
  const [doCenterItems, setDoCenterItems] = useState<boolean | undefined>(
    centerItems,
  );
  const { breadcrumbLinks } = useContext(HierarchyLinksContext);
  const { windowWidth } = useWindowSize();
  const { t } = useI18n();
  const { asPath } = useRouter();

  // Get path without query params, hash and leading slash
  const currentPath = asPath
    ? asPath.split(/[?#]/)[0].replace(/^\//, '')
    : null;

  const [
    firstVisualBreadcrumbLinkIsVisible,
    setFirstVisualBreadcrumbLinkIsVisible,
  ] = useState(true);
  const [
    lastVisualBreadcrumbLinkIsVisible,
    setLastVisualBreadcrumbLinkIsVisible,
  ] = useState(true);

  const checkForOverFlow = useCallback(() => {
    if (!scrollWrapper?.current) return;
    const elements = scrollWrapper.current.children;

    if (!elements.length) return;
    // index 0 is visually the last element as wrapper has row-reverse flex direction
    const lastElementIsVisible =
      Math.ceil(elements[0].getBoundingClientRect().right) <=
      Math.ceil(scrollWrapper?.current.getBoundingClientRect().right);

    // last index is visually the first element as wrapper has row-reverse flex direction
    const firstElementIsVisible =
      Math.ceil(elements[elements.length - 1].getBoundingClientRect().left) >=
      Math.ceil(scrollWrapper?.current.getBoundingClientRect().left);

    setFirstVisualBreadcrumbLinkIsVisible(firstElementIsVisible);
    setLastVisualBreadcrumbLinkIsVisible(lastElementIsVisible);

    const contentDoesOveflow =
      elements[0].getBoundingClientRect().right -
        elements[elements.length - 1].getBoundingClientRect().left >
      scrollWrapper.current.getBoundingClientRect().width;

    setDoCenterItems(centerItems && !contentDoesOveflow);
  }, [centerItems]);

  useEffect(() => {
    checkForOverFlow();
  }, [checkForOverFlow, breadcrumbLinks, windowWidth]);

  if (!breadcrumbLinks?.length) return;

  return (
    <nav
      aria-label={t('global.breadcrumbLabel')}
      className={classNames(styles.component, className)}
    >
      {doGradientOnOverflow && (
        <React.Fragment>
          <div
            className={classNames(
              styles.gradientOverlay,
              styles.gradientOverlayLeft,
              {
                [styles.doDisplay]:
                  firstVisualBreadcrumbLinkIsVisible === false, // we dont want to add class on undefined (initial state)
              },
            )}
          />
          <div
            className={classNames(
              styles.gradientOverlay,
              styles.gradientOverlayRight,
              {
                [styles.doDisplay]: lastVisualBreadcrumbLinkIsVisible === false, // we dont want to add class on undefined (initial state)
              },
            )}
          />
        </React.Fragment>
      )}

      <ol
        ref={scrollWrapper}
        className={classNames(styles.breadcrumbLinksWrapper, {
          [styles.centerItems]: doCenterItems,
          // add class if first and last link item is intersecting OR there is only one list item to display, being the lastVisualBreadcrumbLink
        })}
        data-testid="breadcrumb-navigation"
        onScroll={checkForOverFlow}
      >
        {breadcrumbLinks?.map((breadcrumb, index) => {
          const isLast = index === breadcrumbLinks.length - 1;

          const isCurrentPage =
            !!currentPath &&
            !!breadcrumb.internalLink &&
            breadcrumb.internalLink.endsWith(currentPath);

          return (
            <li
              key={`${breadcrumb.linkText}${index}`}
              className={styles.breadcrumbListItem}
            >
              <span className={styles.breadcrumbLink}>
                <Link
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className={styles.breadcrumbText}
                  link={breadcrumb}
                >
                  {breadcrumb.linkText}
                </Link>
                {!isLast && (
                  <span aria-hidden="true" className={styles.divider}>
                    {' / '}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
