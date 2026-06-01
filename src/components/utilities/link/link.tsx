import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, {
  forwardRef,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  useCallback,
} from 'react';
import {
  setPopUpModalLastTrigger,
  trackClickToMainSite,
} from 'integrations/tracking/google-tag-manager/scripts';
import { useInternalLinksContext } from 'libraries/contexts/internal-navigation-context';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import { useActiveModalContext } from '../modal/context/modal-context';

export interface LinkProps {
  'aria-label'?: string | null;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  draggable?: 'false' | 'true';
  link?: Pick<
    BaseLink,
    | 'anchorLink'
    | 'externalLink'
    | 'internalLink'
    | 'internalLinkRef'
    | 'linkText'
    | 'modalId'
    | 'target'
  >;
  onBlur?: (event: any) => void;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  query?:
    | { [key: string]: string | boolean | number | undefined }
    | ParsedUrlQuery;
  rel?: string;
  tabIndex?: number;
  target?: HTMLAttributeAnchorTarget | null;
  title?: string | null;
  trackOnClick?: (linkText?: string | null, url?: string | null) => void;
}

const Link = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps>(
  ({ children, link, target, trackOnClick, query, ...rest }, ref) => {
    const router = useRouter();
    const currentLocale = getLocaleFromAsPath(router.asPath);
    const { internalLinks } = useInternalLinksContext();
    const { setFocusThisAtClose, setActiveModal } = useActiveModalContext();
    // Always triggered for external links. Fires reporting if linking to main site. Fires optional provided onClick
    const externalOnClickHandler = useCallback<
      MouseEventHandler<HTMLAnchorElement>
    >(
      (event) => {
        // Check for external link to main site and report if necessary
        if (
          process.env.NEXT_PUBLIC_AMPLIENCE_MAIN_SITE_URL &&
          link?.externalLink?.includes(
            process.env.NEXT_PUBLIC_AMPLIENCE_MAIN_SITE_URL,
          )
        ) {
          trackClickToMainSite({
            clickText: link.linkText,
            clickUrl: link.externalLink,
          });
        }

        // Always try to execute provided onClick
        rest?.onClick?.(event);
        trackOnClick?.(link?.linkText, link?.externalLink || undefined);
      },
      [link, rest, trackOnClick],
    );

    // Always triggered if not internal or external link. Internal guard clauses to prevent modal code. Fires optional provided onClick
    const modalOnClickHandler = useCallback<
      MouseEventHandler<HTMLButtonElement>
    >(
      (event) => {
        if (link?.modalId) {
          setActiveModal &&
            setActiveModal({
              id: link.modalId,
              title: link.linkText || undefined,
            });
          setFocusThisAtClose && setFocusThisAtClose(event.currentTarget);

          // Store in-memory the last modal trigger link text for tracking purposes
          setPopUpModalLastTrigger(link?.linkText);
        }

        rest?.onClick?.(event);
        trackOnClick?.(link?.linkText, link?.modalId);
      },
      [link, rest, setActiveModal, setFocusThisAtClose, trackOnClick],
    );

    delete query?.slug;

    if (link?.internalLinkRef || link?.internalLink) {
      const pathname = () => {
        // If internalLinkRef is present, check if the internalLinkRef.id is present in internalLinks
        if (link?.internalLinkRef?.length) {
          const internalLinkRef = link.internalLinkRef[0];
          const internalLink =
            internalLinks?.[internalLinkRef.id]?.[currentLocale ?? ''];

          // Guard clause to prevent undefined
          if (internalLink) return internalLink;
        }

        // If internalLinkRef is not present, fallback to internalLink
        if (link?.internalLink) return link?.internalLink;

        // Just in case, return undefined
        return 'undefined';
      };

      return (
        <NextLink
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={{
            hash: link.anchorLink,
            pathname: pathname().startsWith('/')
              ? pathname()
              : `/${pathname()}`,

            query,
          }}
          onClick={(e) => {
            rest?.onClick?.(e);
            trackOnClick?.(link.linkText, pathname() || undefined);
          }}
          target={target ?? link.target ?? undefined}
          aria-label={rest['aria-label'] || undefined}
        >
          {children}
        </NextLink>
      );
    }

    if (link?.externalLink) {
      return (
        <a
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={link.externalLink}
          onClick={
            externalOnClickHandler as MouseEventHandler<HTMLAnchorElement>
          }
          target={target ?? link.target ?? undefined}
          aria-label={rest['aria-label'] || undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        {...rest}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        aria-label={rest['aria-label'] ?? undefined}
        onClick={modalOnClickHandler}
        title={rest.title ?? undefined}
      >
        {children}
      </button>
    );
  },
);

Link.displayName = 'Link';

export default Link;
