import classNames from 'classnames';
import Icon from 'components/atoms/icon/icon';
import styles from './arrow.module.scss';

export interface ControlButtonArrowProps {
  className?: string;
  disabled?: boolean;
  iconName: IconName;
  label: string;
  onClick?: () => void;
  size?: number;
}

const ControlButtonArrow = ({
  disabled = false,
  className,
  iconName,
  size = 32,
  label,
  onClick,
}: ControlButtonArrowProps) => (
  <button
    type="button"
    aria-label={label}
    className={classNames(styles.component, className)}
    disabled={disabled}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : undefined}
    onClick={onClick}
  >
    <Icon
      className={classNames(styles.icon)}
      name={iconName}
      size={size}
      hidden
    />
  </button>
);

ControlButtonArrow.displayName = 'Arrow';

export default ControlButtonArrow;
