import { ButtonProps } from './button';

const defaultStub: ButtonProps = {
  disabled: false,
  leftIcon: 'ArrowLeft_24',
  rightIcon: 'ArrowRight_24',
  size: 'medium',
  text: 'Button text',
  type: 'button',
  variant: 'Primary',
};

const withoutIconsStub: ButtonProps = {
  ...defaultStub,
  leftIcon: undefined,
  rightIcon: undefined,
};

export default <Record<string, ButtonProps>>{
  default: defaultStub,
  withoutIcons: withoutIconsStub,
};
