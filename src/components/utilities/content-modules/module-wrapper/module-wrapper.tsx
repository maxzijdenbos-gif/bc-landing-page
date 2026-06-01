import classNames from 'classnames';
import React, { forwardRef, useId } from 'react';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';
import styles from './module-wrapper.module.scss';

export interface ModuleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  anchor?: boolean;
  anchorTarget?: string;
  anchorTitle?: string;
  /** The background color context to use */
  color?: BackgroundColor;
  hero?: boolean;
  schemaData?: PageAdapter['schemaData'];
  tabIndex?: number;
  tags?: PageAdapter['tags'];
}

const ModuleWrapper = forwardRef<HTMLDivElement, ModuleWrapperProps>(
  (
    {
      anchorTarget,
      children,
      className,
      color,
      hero,
      id,
      tabIndex,
      anchor,
    }: ModuleWrapperProps,
    ref,
  ) => {
    const fallbackId = useId();
    return (
      <div
        ref={ref}
        className={classNames(styles.component, className)}
        data-anchor={anchor}
        data-color={color}
        data-hero={hero}
        id={anchorTarget ?? id ?? fallbackId}
        tabIndex={tabIndex}
      >
        {children}
      </div>
    );
  },
);

ModuleWrapper.displayName = 'ModuleWrapper';

export default ModuleWrapper;
