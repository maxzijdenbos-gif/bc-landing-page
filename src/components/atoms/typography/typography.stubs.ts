import { TypographyProps } from './typography';

const defaultStub: TypographyProps = {
  children: 'Typography',
  htmlFor: undefined,
  tag: 'h1',
  tagStyle: 'headlineLarge',
};

export default <Record<string, TypographyProps>>{
  default: defaultStub,
};
