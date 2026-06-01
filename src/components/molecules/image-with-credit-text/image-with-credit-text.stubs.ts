import imageStubs from 'components/atoms/image/image.stubs';
import { ImageWithCreditTextProps } from './image-with-credit-text';

const imageStub = {
  ...imageStubs.default,
  height: 500,
  quality: 100,
  title: 'Image with credit',
  width: 500,
};

const defaultStub: ImageWithCreditTextProps = {
  creditText: 'Image-Text',
  ...imageStub,
};

export default <Record<string, ImageWithCreditTextProps>>{
  default: defaultStub,
};
