import classNames from 'classnames';
import { ReactElement, useState } from 'react';
import { useRadioContext } from 'components/molecules/radio-group/radio-group';
import styles from './radio-card.module.scss';

export interface RadioCardProps {
  children?: ReactElement<any>;
  /** Disabling input */
  disabled?: boolean;
  /** Used to specify the RadioGroupName */
  groupName: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  tabIndex?: number;
  /** The value representing the radio card */
  value: string;
  /** Radio card appearance */
  variant?: 'box' | 'dot';
}

const RadioCard = ({
  children,
  disabled,
  value,
  groupName,
  onClick,
  style,
  tabIndex,
  variant = 'box',
}: RadioCardProps) => {
  const selected = useRadioContext();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <label
      className={classNames(styles.component, styles[variant], {
        [styles.isPressed]: isPressed,
      })}
      style={style}
    >
      <input
        className={styles.input}
        defaultChecked={selected === value}
        disabled={disabled}
        name={groupName}
        onClick={onClick}
        onMouseDown={() => {
          setIsPressed(true);
        }}
        onMouseLeave={() => {
          setIsPressed(false);
        }}
        onMouseUp={() => {
          setIsPressed(false);
        }}
        tabIndex={tabIndex}
        type="radio"
        value={value}
      />
      <div className={styles.container}>{children}</div>
    </label>
  );
};

RadioCard.displayName = 'RadioCard';

export default RadioCard;
