import classNames from 'classnames';
import { useI18n } from 'next-localization';
import Icon from 'components/atoms/icon/icon';
import styles from './quantity-stepper.module.scss';

export interface QuantityStepperProps {
  decrementClassName?: string;
  maximum?: number;
  onlyAllowRemoval?: boolean;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityStepper = ({
  decrementClassName,
  onlyAllowRemoval,
  quantity,
  maximum,
  setQuantity,
}: QuantityStepperProps) => {
  const { t } = useI18n();

  const handleDecrement = () => {
    if (quantity < 1) return;
    if (onlyAllowRemoval) {
      setQuantity(0);
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (maximum === undefined || quantity < maximum) setQuantity(quantity + 1);
  };

  const isRemoveAction = onlyAllowRemoval || quantity === 1;

  return (
    <div className={styles.component}>
      <p className={styles.quantity}>
        <span className="screenReaderOnly">{t('cart.quantity')}:</span>{' '}
        {quantity}
      </p>
      <button
        data-testid="decrement-button"
        className={classNames(
          styles.button,
          styles.buttonDecrement,
          decrementClassName,
        )}
        aria-label={
          isRemoveAction ? t('cart.removeBtn') : t('cart.decreaseBtn')
        }
        onClick={handleDecrement}
      >
        <Icon
          className={styles.icon}
          name={isRemoveAction ? 'Trash_24' : 'Minus_24'}
          hidden
        />
      </button>
      <button
        data-testid="increment-button"
        className={styles.button}
        disabled={maximum !== undefined && quantity >= maximum}
        aria-label={t('cart.increaseBtn')}
        onClick={handleIncrement}
      >
        <Icon className={styles.icon} name="Plus_24" hidden />
      </button>
    </div>
  );
};

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
