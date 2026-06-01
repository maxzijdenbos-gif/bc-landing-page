import classNames from 'classnames';
import React, { forwardRef, Ref } from 'react';
import Button from 'components/molecules/button/button';
import styles from './button-list.module.scss';

export interface ButtonListProps {
  buttonInnerClassName?: string;
  buttons: BaseButton[];
  className?: string;
}

const ButtonList = forwardRef(
  (
    { buttons, buttonInnerClassName, className }: ButtonListProps,
    ref: Ref<any>,
  ) => {
    if (!buttons) return;

    return (
      <div ref={ref} className={classNames(styles.component, className)}>
        {buttons.map((props, i) => (
          <React.Fragment key={i}>
            {props.lineBreakBefore && <div className={styles.break}></div>}
            <Button
              className={styles.button}
              innerClassName={buttonInnerClassName}
              link={props.link}
              target={props.link?.target}
              text={props.link?.linkText || ''}
              variant={props.style}
            />
          </React.Fragment>
        ))}
      </div>
    );
  },
);

ButtonList.displayName = 'ButtonList';

export default ButtonList;
