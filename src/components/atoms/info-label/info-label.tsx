import classNames from 'classnames';
import Typography from '../typography/typography';
import styles from './info-label.module.scss';

export type InfoLabelBackgroundColor = 'base' | 'tint' | 'contrast';
type InfoLabelSizes = 'medium' | 'large';
type InfoLabelVariants = 'solid' | 'blur';

export const backgroundColors: Record<InfoLabelBackgroundColor, string> = {
  base: styles.base,
  contrast: styles.contrast,
  tint: styles.tint,
};

export const variants: Record<InfoLabelVariants, string> = {
  blur: styles.blur,
  solid: styles.solid,
};

export const sizes: Record<InfoLabelSizes, string> = {
  large: styles.large,
  medium: styles.medium,
};

export interface InfoLabelProps {
  /** The color schema for the label */
  backgroundColor?: InfoLabelBackgroundColor;
  /** The text to show */
  children?: React.ReactNode;
  /* The size of the label */
  size?: InfoLabelSizes;
  /** The text to show */
  variant?: InfoLabelVariants;
}
const InfoLabel = ({
  backgroundColor = 'contrast',
  children,
  size = 'medium',
  variant = 'solid',
}: InfoLabelProps) => {
  return (
    <div
      className={classNames(
        styles.component,
        backgroundColors[backgroundColor],
        variants[variant],
        sizes[size],
      )}
    >
      <Typography tag="p" tagStyle="actionSmall" weight="heavy">
        {children}
      </Typography>
    </div>
  );
};

InfoLabel.displayName = 'InfoLabel';

export default InfoLabel;
