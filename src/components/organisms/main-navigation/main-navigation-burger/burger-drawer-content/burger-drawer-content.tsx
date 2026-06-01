import classNames from 'classnames';
import { forwardRef, ReactNode, Ref, useRef, useState } from 'react';
import mergeRefs from 'libraries/utilities/merge-refs';
import styles from './burger-drawer-content.module.scss';

type BurgerDrawerContentProps = {
  children?: ReactNode | ReactNode[];
  className?: string;
  doDisplay: boolean;
  isAboveTablet?: boolean;
  onTransitionEndCallback: (id: string) => void;
  prepareDisplay?: boolean;
  uuid: string;
};

const BurgerDrawerContent = forwardRef(
  (
    {
      doDisplay,
      onTransitionEndCallback,
      prepareDisplay,
      children,
      uuid,
      className,
    }: BurgerDrawerContentProps,
    passedRef: Ref<HTMLDivElement>,
  ) => {
    const componentRef = useRef<HTMLDivElement | null>(null);
    const refs = mergeRefs([passedRef, componentRef]);
    const [doRender, setDoRender] = useState(false);

    return (
      <div
        ref={refs}
        inert={!doDisplay}
        className={classNames(styles.component, className, {
          [styles.drawerContentDisplay]: doDisplay,
          [styles.drawerContentPrepareDisplay]: prepareDisplay,
        })}
        id={uuid}
        onTransitionEnd={(e) => {
          if (doRender !== !!(doDisplay || prepareDisplay))
            setDoRender(!!(doDisplay || prepareDisplay));
          if (
            doDisplay &&
            onTransitionEndCallback &&
            componentRef &&
            e.target === componentRef.current
          ) {
            onTransitionEndCallback(uuid);
          }
        }}
      >
        {!!(doRender || doDisplay) && children}
      </div>
    );
  },
);

BurgerDrawerContent.displayName = 'BurgerDrawerContent';

export default BurgerDrawerContent;
