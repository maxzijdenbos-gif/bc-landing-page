import classNames from 'classnames';
import * as Icons from 'assets/icons/icons';
import styles from './icon.module.scss';

const DEFAULT_SIZE = 24;
const DEFAULT_PRESERVE_ASPECT_RATIO = 'xMidYMid meet';

interface BaseIconProps {
  /** The class name to apply */
  className?: string;
  /** A height override away from DEFAULT_SIZE */
  height?: number | '100%';
  /** The name of the icon to show. The intended use size of the icon is contained in its name and will be used is the icon size unless a specific size is given */
  name: IconName;
  /** Override preserveAspectRatio. Useful when left-align is required for 100% width etc */
  preserveAspectRatio?: string;
  role?: string;
  /** A size override away from DEFAULT_SIZE */
  size?: number;
  /** A height override away from DEFAULT_SIZE */
  width?: number | '100%';
}

export type IconProps = BaseIconProps &
  (
    | {
        ariaLabel?: string;
        hidden: true;
      }
    | {
        ariaLabel: string;
        hidden?: false;
      }
  );

const Icon = ({
  className,
  height,
  hidden,
  name,
  preserveAspectRatio,
  size,
  ariaLabel,
  width,
  role = 'img',
}: IconProps) => {
  const IconComponent = Icons[name];
  const sizeFromName = name?.split('_')?.[1];

  if (!IconComponent) {
    return null;
  }

  let roleToUse = role;

  if (hidden || !ariaLabel) {
    roleToUse = 'presentation';
  }

  return (
    <IconComponent
      {...(ariaLabel && !hidden && { 'aria-label': ariaLabel })}
      aria-hidden={hidden ? true : undefined}
      className={classNames(styles.component, styles.icon, className)}
      height={height || size || sizeFromName || DEFAULT_SIZE}
      preserveAspectRatio={preserveAspectRatio || DEFAULT_PRESERVE_ASPECT_RATIO}
      width={width || size || sizeFromName || DEFAULT_SIZE}
      role={roleToUse}
    />
  );
};

Icon.displayName = 'Icon';

export default Icon;
