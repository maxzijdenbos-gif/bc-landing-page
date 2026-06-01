import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import lockBodyScroll from 'libraries/utilities/body-scroll-lock/lock-body-scroll';
import styles from './drawer.module.scss';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean | null;
  mobilePosition?: 'bottom';
  onInternalClose?: () => void;
  onTransitionEnd?: () => void;
  position?: 'right' | 'left';
}

const Drawer = ({
  children,
  className,
  isOpen,
  mobilePosition,
  onInternalClose,
  onTransitionEnd,
  position = 'left',
  ...props
}: DrawerProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const onDrawerClick = (event: any) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      isOpen &&
      onInternalClose
    ) {
      onInternalClose();
    }
  };

  const onKeyup = useCallback(
    (event: any) => {
      if (event.key === 'Escape' && onInternalClose) {
        onInternalClose();
      }
    },
    [onInternalClose],
  );

  useEffect(() => {
    lockBodyScroll(isOpen || false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keyup', onKeyup);
    } else {
      document.removeEventListener('keyup', onKeyup);
    }

    return () => {
      document.removeEventListener('keyup', onKeyup);
    };
  }, [isOpen, onKeyup]);

  return (
    // disabled as the keyup is catching interactions within the drawer, listening for escape key for closing
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={classNames(styles.component, className, {
        [styles.isOpen]: isOpen,
        [styles.mobileBottomSheet]: mobilePosition === 'bottom',
        [styles.right]: position === 'right',
      })}
      onClick={onDrawerClick}
      {...props}
    >
      <div className={styles.overlay} />
      <div
        ref={sidebarRef}
        inert={!isOpen}
        className={classNames(styles.sidebar, {
          [styles.sidebarIsOpen]: isOpen,
        })}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
