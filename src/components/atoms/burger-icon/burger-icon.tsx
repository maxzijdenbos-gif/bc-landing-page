import { memo, useRef } from 'react';
import styles from './burger-icon.module.scss';

const DEFAULT_CROPPED_SIZE = 20;

const BurgerIcon = () => {
  const burgerRef = useRef<null | HTMLDivElement>(null);
  const doAnimate = () => {
    burgerRef.current?.classList.remove(
      `${styles.component}`,
      `${styles.doAnimation}`,
    );
    burgerRef.current?.classList.add(`${styles.component}`);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        burgerRef.current?.classList.add(`${styles.doAnimation}`);
      });
    });
  };

  return (
    <div
      ref={burgerRef}
      className={styles.component}
      data-testid="burger-icon"
      style={{
        height: `${DEFAULT_CROPPED_SIZE}px`,
        width: `${DEFAULT_CROPPED_SIZE}px`,
      }}
    >
      <svg
        className={styles.svg}
        fill="none"
        height="20"
        onMouseEnter={doAnimate}
        onMouseLeave={doAnimate}
        viewBox="0 0 40 20"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M10 4V2H30V4H10Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M10 18V16H30V18H10Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          className={styles.pseudoLine}
          clipRule="evenodd"
          d="M0.5 11L4 9H19.5L16 11H0.5Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          className={styles.mainLine}
          clipRule="evenodd"
          d="M0.5 11L4 9H19.5L16 11H0.5Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        <path
          className={styles.mainLine}
          clipRule="evenodd"
          d="M20.5 11L24 9H39.5L36 11H20.5Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

BurgerIcon.displayName = 'BurgerIcon';

export default memo(BurgerIcon);
