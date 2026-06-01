import classNames from 'classnames';
import styles from './color-swatch.module.scss';

export interface ColorSwatchProps {
  hexCodePrimary: string;
  hexCodeSecondary?: string | null;
  size?: 'small' | 'medium';
}

const ColorSwatch = ({
  hexCodePrimary,
  hexCodeSecondary,
  size,
}: ColorSwatchProps) => {
  return (
    <div
      className={classNames(styles.component, size && styles[size])}
      style={{
        background: `linear-gradient(90deg, #${hexCodePrimary} 50%, #${
          hexCodeSecondary ?? hexCodePrimary
        } 50%)`,
      }}
    />
  );
};

ColorSwatch.displayName = 'ColorSwatch';

export default ColorSwatch;
