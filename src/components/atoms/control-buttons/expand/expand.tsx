import Icon from 'components/atoms/icon/icon';
import styles from './expand.module.scss';

const ControlButtonExpand = () => (
  <div className={styles.component}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Icon key={index} className={styles.arrow} name="ArrowLeft_24" hidden />
    ))}
  </div>
);

ControlButtonExpand.displayName = 'Expand';

export default ControlButtonExpand;
