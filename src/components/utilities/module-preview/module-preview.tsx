import classNames from 'classnames';
import React from 'react';
import styles from './module-preview.module.scss';

interface ModulePreviewProps {
  children?: React.ReactNode;
  color?: BackgroundColor;
  isDocs?: boolean;
  layout?: 'centered' | 'fullscreen';
  theme?: Theme;
}

const ModulePreview = ({
  children,
  color,
  layout = 'fullscreen',
  isDocs = false,
  theme,
}: ModulePreviewProps) => {
  return (
    <div
      className={classNames(styles.component, {
        [styles.isCentered]: layout === 'centered',
        [styles.isDocs]: isDocs,
      })}
      data-color={color}
      data-theme={theme}
    >
      {children}
    </div>
  );
};

export default ModulePreview;
