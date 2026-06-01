import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useState } from 'react';
import MotionTrackSlide from 'components/utilities/motion/hovers/motion-track-slide/motion-track-slide';
import useBreakpoints from 'libraries/hooks/dom/use-breakpoints';
import Icon, { IconProps } from '../icon/icon';
import styles from './player-button.module.scss';

type ButtonVariant = 'Primary' | 'Secondary';

export interface PlayerButtonProps {
  /** Accessibility aria-label */
  ariaLabel?: string;
  /** The class name to apply */
  className?: string;
  /** Indicates whether the button is disabled */
  disabled?: boolean;
  /** The name of the icon */
  iconName: IconProps['name'];
  /** If the button should be taking active state */
  isActive?: boolean;
  /** Optional click handler **/
  onClick?: () => void;
  /** Makes the elements focusable, allow or prevent them from being sequentially focusable */
  tabIndex?: number;
  /** the variant */
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  Primary: styles.isPrimary,
  Secondary: styles.isSecondary,
};

const PlayerButton = ({
  className,
  disabled,
  iconName,
  isActive,
  onClick,
  tabIndex = 0,
  variant = 'Primary',
  ariaLabel,
  ...rest
}: PlayerButtonProps) => {
  const { t } = useI18n();
  const [triggerAnimation, setTriggerAnimation] = useState<boolean | null>(
    null,
  );
  const { isDesktopView } = useBreakpoints();

  if (!iconName) return null;

  const finalAriaLabel = ariaLabel ?? t('video.mediaPlayer');

  return (
    <button
      aria-label={finalAriaLabel}
      className={classNames(styles.component, className, variants[variant], {
        [styles.isActive]: isActive,
      })}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => {
        setTriggerAnimation((prev) => !prev);
      }}
      tabIndex={tabIndex}
      {...rest}
    >
      <MotionTrackSlide
        className={styles.animationContainer}
        doAnimate={triggerAnimation}
      >
        <Icon name={iconName} size={isDesktopView ? 32 : 24} hidden />
      </MotionTrackSlide>
    </button>
  );
};

PlayerButton.displayName = 'PlayerButton';

export default PlayerButton;
