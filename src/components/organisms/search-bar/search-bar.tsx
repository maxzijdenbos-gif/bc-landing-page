import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Icon from 'components/atoms/icon/icon';
import Button from 'components/molecules/button/button';
import SearchBarSuggestions, {
  SearchBarSuggestionsHandle,
  SuggestionsSection,
} from 'components/organisms/search-bar/search-bar-suggestions';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import lockBodyScroll from 'libraries/utilities/body-scroll-lock/lock-body-scroll';
import styles from './search-bar.module.scss';

export interface SearchBarProps {
  className?: string;
  defaultValue?: string;
  id?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onExpanded?: () => void;
  onSubmit?: (value: string) => void;
  onSuggestionsBottomLinkClick?: (value: string) => void;
  suggestions?: SuggestionsSection[];
  suggestionsClassName?: string;
  value?: string;
}

const SearchBar = ({
  className,
  defaultValue = '',
  id: idProp,
  onChange,
  onClear,
  onExpanded,
  onSuggestionsBottomLinkClick,
  onSubmit,
  suggestions,
  suggestionsClassName,
  value: valueProp,
}: SearchBarProps) => {
  const { t } = useI18n();
  const { isTabletOrAbove = false } = useBreakpoints();
  const reactId = useId();
  const id = idProp ?? reactId;
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleDesktopRef = useRef<HTMLAnchorElement>(null);
  const toggleMobileRef = useRef<HTMLAnchorElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<SearchBarSuggestionsHandle>(null);
  const initialHasQuery =
    defaultValue.trim().length > 0 ||
    (valueProp !== undefined && String(valueProp).trim().length > 0);
  const skipWidthEnterAnimation = useRef(initialHasQuery);
  const [open, setOpen] = useState(() => defaultValue.trim().length > 0);
  const [surfaceWide, setSurfaceWide] = useState(() => initialHasQuery);
  const [typedTransitions, setTypedTransitions] = useState(
    () => !initialHasQuery,
  );
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const hasValue = value.trim().length > 0;
  const expanded = open || hasValue;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const toggleExpand = useCallback(() => {
    if (!open) {
      onExpanded?.();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      });
    } else {
      setValue('');
    }
    setOpen(!open);
  }, [onExpanded, open, setValue]);

  useEffect(() => {
    lockBodyScroll(open || false);
  }, [open]);

  useLayoutEffect(() => {
    if (!expanded) {
      const resetId = requestAnimationFrame(() => {
        setSurfaceWide(false);
      });
      return () => cancelAnimationFrame(resetId);
    }
    if (skipWidthEnterAnimation.current) {
      skipWidthEnterAnimation.current = false;
      const wideId = requestAnimationFrame(() => {
        setSurfaceWide(true);
      });
      return () => cancelAnimationFrame(wideId);
    }
    const wideId = requestAnimationFrame(() => {
      setSurfaceWide(true);
    });
    return () => cancelAnimationFrame(wideId);
  }, [expanded]);

  useLayoutEffect(() => {
    if (!initialHasQuery) {
      return;
    }
    const id = requestAnimationFrame(() => {
      setTypedTransitions(true);
    });
    return () => cancelAnimationFrame(id);
  }, [initialHasQuery]);

  const handleClear = useCallback(() => {
    setValue('');
    onClear?.();
    inputRef.current?.focus();
  }, [onClear, setValue]);

  const handleSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(value.trim());
    },
    [onSubmit, value],
  );

  const closeSearch = useCallback(
    (options?: { restoreFocus?: boolean }) => {
      setValue('');
      setOpen(false);
      if (options?.restoreFocus) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const toggle = isTabletOrAbove
              ? toggleDesktopRef.current
              : toggleMobileRef.current;
            toggle?.focus();
          });
        });
      }
    },
    [isTabletOrAbove, setValue],
  );

  /** Close when focus leaves the whole search region (input, toolbar buttons, suggestions). */
  useEffect(() => {
    const node = searchBarRef.current;
    if (!node) return;

    const handleFocusOut = (event: FocusEvent) => {
      if (!isTabletOrAbove) {
        return;
      }
      const related = event.relatedTarget;
      if (related instanceof Node && node.contains(related)) {
        return;
      }
      if (!open && !hasValue) {
        return;
      }
      requestAnimationFrame(() => {
        if (!searchBarRef.current?.contains(document.activeElement)) {
          closeSearch();
        }
      });
    };

    node.addEventListener('focusout', handleFocusOut);
    return () => {
      node.removeEventListener('focusout', handleFocusOut);
    };
  }, [closeSearch, hasValue, isTabletOrAbove, open]);

  const handleSuggestionsFocusOut = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSearch({ restoreFocus: true });
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        suggestionsRef.current?.focusFirstAnchor();
      }
    },
    [closeSearch],
  );

  return (
    <div
      className={classNames(styles.component, className)}
      data-expanded={expanded || undefined}
      ref={searchBarRef}
    >
      <div className={styles.header}>
        <Button
          ref={toggleMobileRef}
          aria-expanded={false}
          leftIcon={expanded ? 'ArrowLeft_24' : 'Search_24'}
          size="small"
          aria-label={t('search.searchToggleBtn')}
          className={styles.toggleWrapMobile}
          type="button"
          variant="Tertiary"
          noBackground
          onClick={toggleExpand}
        />
        {!expanded && (
          <Button
            ref={toggleDesktopRef}
            aria-expanded={false}
            leftIcon="Search_24"
            size="small"
            className={styles.toggleWrapDesktop}
            innerClassName={styles.toggleSolidButton}
            text={t('search.searchToggleBtn')}
            type="button"
            variant="Tertiary"
            onClick={toggleExpand}
          />
        )}

        {expanded && (
          <div
            className={classNames(styles.expandSurface, {
              [styles.expandSurfaceWide]: surfaceWide,
            })}
          >
            <form
              ref={formRef}
              className={classNames(styles.form, {
                [styles.typedTransitions]: typedTransitions,
              })}
              data-has-value={hasValue || undefined}
              role="search"
              onSubmit={handleSubmit}
            >
              <span className={styles.leadingWrap}>
                <Icon
                  className={styles.leadingIcon}
                  hidden
                  name="Search_24"
                  size={20}
                />
              </span>
              <div className={styles.field}>
                <input
                  ref={inputRef}
                  autoComplete="off"
                  autoCorrect="off"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={expanded && suggestions ? 'true' : 'false'}
                  aria-controls={`${id}-suggestions`}
                  onKeyDown={handleInputKeyDown}
                  className={styles.input}
                  id={`${id}-input`}
                  aria-label={t('search.inputLabel')}
                  placeholder={t('search.inputPlaceholder')}
                  type="search"
                  value={value}
                  required
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className={styles.trailing} inert={!hasValue}>
                <Button
                  aria-label={t('search.clearBtn')}
                  className={styles.trailingBtnWrap}
                  innerClassName={classNames(
                    styles.trailingBtn,
                    styles.trailingBtnClear,
                  )}
                  leftIcon="Close_16"
                  noBackground
                  size="small"
                  type="button"
                  variant="Tertiary"
                  onClick={handleClear}
                />
                <span aria-hidden className={styles.divider} />
                <Button
                  aria-label={t('search.submitBtn')}
                  className={styles.trailingBtnWrap}
                  innerClassName={styles.trailingBtn}
                  leftIcon="Search_24"
                  noBackground
                  size="small"
                  type="submit"
                  variant="Tertiary"
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {expanded && suggestions && (
        <SearchBarSuggestions
          className={suggestionsClassName}
          id={`${id}-suggestions`}
          ref={suggestionsRef}
          onBottomLinkClick={onSuggestionsBottomLinkClick}
          onEscape={() => closeSearch({ restoreFocus: true })}
          onFocusOut={handleSuggestionsFocusOut}
          query={value}
          suggestions={suggestions}
        />
      )}
    </div>
  );
};

export default SearchBar;
