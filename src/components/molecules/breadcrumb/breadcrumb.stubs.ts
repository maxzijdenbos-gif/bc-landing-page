import { BreadcrumbProps } from './breadcrumb';

const defaultStub: BreadcrumbProps = {
  centerItems: false,
  doGradientOnOverflow: true,
};

export default <Record<string, BreadcrumbProps>>{
  default: defaultStub,
};
