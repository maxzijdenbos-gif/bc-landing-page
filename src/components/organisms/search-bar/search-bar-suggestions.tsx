import classNames from 'classnames';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import * as Logos from 'assets/logos/logos';
import Icon from 'components/atoms/icon/icon';
import Typography from 'components/atoms/typography/typography';
import { imageUrlWithDimensions } from 'libraries/utilities/image-url-params';
import styles from './search-bar-suggestions.module.scss';

export type SearchBarSuggestionsHandle = {
  focusFirstAnchor: () => void;
};

export type SuggestionsItem = {
  brand?: BrandNames;
  icon?: IconName;
  image?: string;
  subtitle?: string;
  subtitleHighlighted?: string;
  title: string;
  titleHighlighted?: string;
  url: string;
};

export type SuggestionsBottomLink = {
  title: string;
  url: string;
};

export type SuggestionsSection = {
  bottomLink?: SuggestionsBottomLink;
  items: SuggestionsItem[];
  title: string;
};

export interface SearchBarSuggestionsProps extends Omit<
  React.ComponentProps<'div'>,
  'ref'
> {
  /** When set, invoked with the trimmed query instead of native navigation (e.g. to record recent searches). */
  onBottomLinkClick?: (keyword: string) => void;
  onEscape?: () => void;
  onFocusOut?: () => void;
  query?: string;
  suggestions: SuggestionsSection[];
}

const SearchBarSuggestions = forwardRef<
  SearchBarSuggestionsHandle,
  SearchBarSuggestionsProps
>(
  (
    {
      query,
      suggestions,
      className,
      onBottomLinkClick,
      onEscape,
      onFocusOut,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focusFirstAnchor: () => {
        if (containerRef.current === null) return;
        containerRef.current.querySelector('a')?.focus();
      },
    }));

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (containerRef.current === null) return;

        const focusableElements = Array.from(
          containerRef.current.querySelectorAll('a'),
        );

        const currentIndex = focusableElements.indexOf(
          document.activeElement as HTMLAnchorElement,
        );

        switch (event.key) {
          case 'Escape': {
            event.preventDefault();
            onEscape?.();
            break;
          }
          case 'ArrowDown': {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableElements.length;

            focusableElements[nextIndex].focus();
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();

            if (currentIndex === 0 && onFocusOut) {
              onFocusOut();
              break;
            }
            const prevIndex =
              (currentIndex - 1 + focusableElements.length) %
              focusableElements.length;
            focusableElements[prevIndex].focus();

            break;
          }

          case 'Home': {
            event.preventDefault();
            focusableElements[0].focus();
            break;
          }

          case 'End': {
            event.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
            break;
          }
        }
      },
      [onEscape, onFocusOut],
    );

    const handleBottomLinkClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!onBottomLinkClick) return;
        if (
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        const keyword = query?.trim() ?? '';
        if (!keyword) return;
        event.preventDefault();
        onBottomLinkClick(keyword);
      },
      [onBottomLinkClick, query],
    );

    const brandLogo = (brand: BrandNames) => {
      const LogoComponent = Logos[brand];

      if (!LogoComponent) return null;

      return <LogoComponent className={styles.brandLogo} aria-label={brand} />;
    };

    return (
      <div
        ref={containerRef}
        className={classNames(
          styles.component,
          { [styles.multipleSections]: suggestions.length > 1 },
          className,
        )}
        {...props}
      >
        {suggestions.map((suggestion, index) => (
          <div className={styles.section} key={`${suggestion.title}-${index}`}>
            <Typography
              tag="h2"
              tagStyle="headlineSmall"
              weight="bold"
              className={styles.heading}
            >
              {suggestion.title}
            </Typography>
            <ul>
              {suggestion.items.map((item, itemIndex) => {
                const image1xUrl = item.image
                  ? imageUrlWithDimensions(item.image, {
                      height: 48,
                      width: 48,
                    })
                  : undefined;
                const image2xUrl = item.image
                  ? imageUrlWithDimensions(item.image, {
                      height: 96,
                      width: 96,
                    })
                  : undefined;

                return (
                  <li key={`${item.title}-${itemIndex}`}>
                    <a
                      href={item.url}
                      onKeyDown={handleKeyDown}
                      className={classNames(styles.link, {
                        [styles.hasImage]: item.image,
                      })}
                    >
                      {image1xUrl && (
                        // Custom srcset and optimized external URLs; next/image not used by design
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className={styles.image}
                          alt=""
                          width={48}
                          height={48}
                          src={image1xUrl}
                          srcSet={`${image1xUrl} 1x, ${image2xUrl} 2x`}
                        />
                      )}
                      <Typography
                        tag="span"
                        tagStyle="bodyMedium"
                        className={styles.title}
                      >
                        <div
                          className={styles.titleHighlighted}
                          dangerouslySetInnerHTML={{
                            __html: item.titleHighlighted || item.title,
                          }}
                        />
                        {(item.subtitle || item.subtitleHighlighted) && (
                          <div
                            className={styles.subtitle}
                            dangerouslySetInnerHTML={{
                              __html:
                                item.subtitleHighlighted || item.subtitle || '',
                            }}
                          />
                        )}
                        {item.brand && brandLogo(item.brand)}
                      </Typography>
                      {item.icon && (
                        <Icon
                          className={styles.icon}
                          name={item.icon}
                          size={16}
                          hidden
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            {suggestion.bottomLink && (
              <a
                href={suggestion.bottomLink.url}
                onClick={handleBottomLinkClick}
                onKeyDown={handleKeyDown}
                className={styles.bottomLink}
              >
                {suggestion.bottomLink.title}
                <Icon name="ArrowRight_16" hidden />
              </a>
            )}
          </div>
        ))}
      </div>
    );
  },
);

SearchBarSuggestions.displayName = 'SearchBarSuggestions';

export default SearchBarSuggestions;
