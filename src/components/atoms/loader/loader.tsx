import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useEffect, useRef } from 'react';
import Icon from '../icon/icon';
import styles from './loader.module.scss';

const DEFAULT_THEME = process.env.NEXT_PUBLIC_THEME_NAME as Theme;

export type LoaderVariant = 'soft' | 'hard';

export interface LoaderProps {
  isVisible?: boolean;
  message?: string;
  theme?: Theme;
  variant?: LoaderVariant;
}

const LoaderIcon = ({ theme }: { theme: Theme }) => {
  const { t } = useI18n();
  const ariaLabel = t('global.loading');

  switch (theme) {
    case 'giant':
      return <Icon name="GiantRush" size={70} ariaLabel={ariaLabel} />;

    case 'liv':
      return <Icon name="LivLoader" size={200} ariaLabel={ariaLabel} />;
  }
};

const Loader = ({
  isVisible = true,
  message,
  theme = DEFAULT_THEME,
  variant = 'soft',
}: LoaderProps) => {
  const { t } = useI18n();
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const displayMessage = message ?? t('global.loadingDetailed');

  useEffect(() => {
    if (variant !== 'hard' || !isVisible) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    return () => {
      if (previousActiveElement.current?.focus) {
        previousActiveElement.current.focus();
      }
    };
  }, [variant, isVisible]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!theme || !isVisible) return null;

  if (variant === 'hard') {
    return (
      <div
        aria-busy="true"
        aria-live="assertive"
        className={classNames(styles.hardLoader, {
          [styles.reducedMotion]: prefersReducedMotion,
        })}
        role="status"
      >
        <div className={styles.backdrop} />
        <div className={styles.content}>
          <div
            className={classNames(styles.iconWrapper, {
              [styles.reducedMotion]: prefersReducedMotion,
            })}
          >
            <LoaderIcon theme={theme} />
          </div>
          <span className="screenReaderOnly">{displayMessage}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={classNames(styles.softLoader, {
        [styles.reducedMotion]: prefersReducedMotion,
      })}
      role="status"
    >
      <div
        className={classNames(styles.iconWrapper, {
          [styles.reducedMotion]: prefersReducedMotion,
        })}
      >
        <LoaderIcon theme={theme} />
      </div>
      <span className="screenReaderOnly">{displayMessage}</span>
    </div>
  );
};

Loader.displayName = 'Loader';

export default Loader;
