import classNames from 'classnames';
import React from 'react';
import styles from './skeleton.module.scss';

export type SkeletonVariant = 'text' | 'rectangular' | 'rounded' | 'circular';
export type SkeletonAnimation = 'pulse' | 'wave' | false;

export interface SkeletonProps {
  /** Animation: pulse (default), wave, or none */
  animation?: SkeletonAnimation;
  /** Optional className */
  className?: string;
  /** Height (e.g. 128 or '2rem'). For variant="text", height is 1em (from CSS). */
  height?: number | string;
  /** Shape: text = single line (1em tall), rectangular, rounded, circular */
  variant?: SkeletonVariant;
  /** Width (e.g. 128 or '60%'). Set for text so the line is visible. */
  width?: number | string;
}

/**
 * Reusable placeholder for loading content. Inspired by MUI Skeleton.
 * Use for images (rectangular/circular), text lines (text), or custom shapes.
 * @see https://mui.com/material-ui/react-skeleton/
 */
const Skeleton = ({
  animation = 'pulse',
  className,
  height,
  variant = 'text',
  width,
}: SkeletonProps) => {
  const style: React.CSSProperties = {};
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined && variant !== 'text') {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <span
      aria-hidden
      className={classNames(
        styles.component,
        styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
        animation &&
          styles[
            `animation${animation.charAt(0).toUpperCase()}${animation.slice(1)}`
          ],
        className,
      )}
      style={style}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
