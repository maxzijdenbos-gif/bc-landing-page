import imageStubs from 'components/atoms/image/image.stubs';
import { ProductListHeroProps } from './product-list-hero';

const defaultStub: ProductListHeroProps = {
  headline: 'test',
  imageObject: imageStubs.default.imageObject,
  theme: 'Light',
};

export default <Record<string, ProductListHeroProps>>{
  default: defaultStub,
};
