import { InfoLabelProps } from './info-label';

const defaultStub: InfoLabelProps = {
  backgroundColor: 'contrast',
  children: 'Label',
  size: 'medium',
  variant: 'solid',
};

const blurredLargeStub: InfoLabelProps = {
  backgroundColor: 'tint',
  children: 'Blurred large',
  size: 'large',
  variant: 'blur',
};

export default <Record<string, InfoLabelProps>>{
  blurredLarge: blurredLargeStub,
  default: defaultStub,
};
