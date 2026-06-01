import type { SkeletonProps } from './skeleton';

export const defaultProps: SkeletonProps = {
  animation: 'pulse',
  variant: 'text',
};

export const rectangular: SkeletonProps = {
  ...defaultProps,
  height: 128,
  variant: 'rectangular',
  width: 128,
};

export const circular: SkeletonProps = {
  ...defaultProps,
  height: 40,
  variant: 'circular',
  width: 40,
};
