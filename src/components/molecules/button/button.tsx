import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributeAnchorTarget,
  useState,
} from 'react';
import Icon, { IconProps } from 'components/atoms/icon/icon';
import Typography from 'components/atoms/typography/typography';
import Link, { LinkProps } from 'components/utilities/link/link';
import MotionTrackSlide from 'components/utilities/motion/hovers/motion-track-slide/motion-track-slide';
import styles from './button.module.scss';

type ButtonSize = 'large' | 'medium' | 'small';

type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary' | 'Text';

export interface ButtonProps {
  /** For toggle / disclosure controls rendered as a button */
  'aria-expanded'?: boolean;
  /** Accessibility aria-label */
  'aria-label'?: string;
  /** The class name to apply */
  className?: string;
  /** Indicates whether the button is disabled */
  disabled?: boolean;
  /** Enable to add hover animation to text variant **/
  doUnderline?: boolean;
  /** When true, button stretches full width and hover slide animation is disabled */
  fullWidth?: boolean;
  /** Sets the id */
  id?: string;
  /** Optional classname for the button inside the wrapper **/
  innerClassName?: string;
  /** The name of the left icon */
  leftIcon?: IconProps['name'];
  /** Link styled as button */
  link?: BaseLink;
  /** Optional blur handler **/
  noBackground?: boolean;
  onBlur?: () => void;
  /** Optional click handler **/
  onClick?: () => void;
  /** Optional focus handler **/
  onFocus?: () => void;
  /** The name of the right icon */
  rightIcon?: IconProps['name'];
  /** What size style to use for the button */
  size?: ButtonSize;
  style?: CSSProperties;
  /** Makes the elements focusable, allow or prevent them from being sequentially focusable */
  tabIndex?: number;
  /** Whether the target page should open in a new window */
  target?: HTMLAttributeAnchorTarget;
  /** The text to show */
  text?: string | null;
  /** Optional classname for the text wrapper **/
  textClassName?: string;
  trackOnClick?: LinkProps['trackOnClick'];
  /** The type of button to use */
  type?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >['type'];
  /** The variant style to use for the button */
  variant?: ButtonVariant;
}

const sizes: Record<ButtonSize, string> = {
  large: styles.isLarge,
  medium: styles.isMedium,
  small: styles.isSmall,
};

const variants: Record<ButtonVariant, string> = {
  Primary: styles.isPrimary,
  Secondary: styles.isSecondary,
  Tertiary: styles.isTertiary,
  Text: styles.isText,
};

const getIconLabel = (iconName: IconProps['name']): string => {
  if (!iconName) return 'action';
  if (iconName.includes('ArrowLeft')) return 'previous';
  if (iconName.includes('ArrowRight')) return 'next';
  if (iconName.includes('ChevronRight')) return 'goTo';
  if (iconName.includes('ChevronLeft')) return 'back';
  if (iconName.includes('Play')) return 'play';
  if (iconName.includes('Pause')) return 'pause';
  if (iconName.includes('Close')) return 'close';
  if (iconName.includes('Download')) return 'download';
  if (iconName.includes('Share')) return 'share';
  return 'action';
};

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      innerClassName,
      disabled = false,
      doUnderline = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      size = 'medium',
      text,
      textClassName,
      variant = 'Primary',
      noBackground,
      onBlur,
      onClick,
      onFocus,
      ...rest
    },
    ref,
  ) => {
    const { t } = useI18n();
    const [triggerAnimation, setTriggerAnimation] = useState<boolean | null>(
      null,
    );

    if (!leftIcon && !rightIcon && !text) return null;

    const isAriaHidden = (rest as Record<string, unknown>)[
      'aria-hidden'
    ] as boolean;
    const linkProps = isAriaHidden
      ? { ...rest, 'aria-hidden': true, 'aria-label': undefined }
      : rest;

    return (
      <div
        className={classNames(className, styles.componentWrapper, {
          [styles.isDisabledWrapper]: disabled,
          [styles.isFullWidth]: fullWidth,
        })}
      >
        <Link
          {...linkProps}
          ref={ref}
          className={classNames(
            innerClassName,
            styles.component,
            sizes[size],
            variants[variant],
            {
              [styles.isDisabled]: disabled,
              [styles.isOnlyIcon]: !text && (leftIcon || rightIcon),
              [styles.doUnderline]: doUnderline,
              [styles.noBackground]: noBackground,
            },
          )}
          data-testid={`button-${variant.toLowerCase() || 'primary'}`}
          data-cursor="link"
          disabled={disabled}
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          onMouseEnter={() => {
            if (variant !== 'Text' && !fullWidth) {
              setTriggerAnimation((prev) => !prev);
            }
          }}
        >
          {leftIcon && (
            <Icon
              className={classNames(styles.icon, styles.leftIcon)}
              name={leftIcon}
              hidden
              ariaLabel={
                text
                  ? `${text} - ${t(`global.${getIconLabel(leftIcon)}`)}`
                  : t(`global.${getIconLabel(leftIcon)}`)
              }
            />
          )}

          {variant === 'Text' ? (
            <Typography
              className={classNames(styles.text, textClassName)}
              tag="div"
              tagStyle="actionLarge"
              weight="bold"
            >
              {text}
            </Typography>
          ) : fullWidth && text ? (
            <span className={classNames(styles.text, textClassName)}>
              {text}
            </span>
          ) : (
            text && (
              <MotionTrackSlide
                className={classNames(styles.text, textClassName)}
                doAnimate={triggerAnimation}
              >
                {text}
              </MotionTrackSlide>
            )
          )}
          {rightIcon && (
            <Icon
              className={classNames(styles.icon, styles.rightIcon)}
              name={rightIcon}
              hidden
              ariaLabel={
                text
                  ? `${text} - ${t(`global.${getIconLabel(rightIcon)}`)}`
                  : t(`global.${getIconLabel(rightIcon)}`)
              }
            />
          )}
        </Link>
      </div>
    );
  },
);

Button.displayName = 'Button';

export default Button;
