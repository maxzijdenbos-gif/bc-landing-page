import { ColorSwatchProps } from './color-swatch';

const defaultStub: ColorSwatchProps = {
  hexCodePrimary: 'FFFFFF',
  hexCodeSecondary: 'FF6E25',
};

export default <Record<string, ColorSwatchProps>>{
  default: defaultStub,
};
