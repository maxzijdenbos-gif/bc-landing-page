import { MessageBarProps } from './message-bar';

const defaultStub: MessageBarProps = {
  link: 'https://www.giant-bicycles.com/us/elements-bike-wash-2025',
  linkText: 'Buy Now',
  message:
    'April Promo: Buy Elements Bike Wash & Get 40% OFF Finish Protection',
  variant: 'Primary',
};

export default <Record<string, MessageBarProps>>{
  default: defaultStub,
};
