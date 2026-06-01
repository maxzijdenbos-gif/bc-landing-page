import { IconProps } from './icon';

const defaultStub: IconProps = {
  ariaLabel: 'This is a aria label',
  hidden: true,
  name: 'ArrowRight_24',
  size: 32,
};

export default <Record<string, IconProps>>{
  default: defaultStub,
};
