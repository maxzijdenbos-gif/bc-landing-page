import { fn } from 'storybook/test';
import { QuantityStepperProps } from './quantity-stepper';

const oneItemStub: QuantityStepperProps = {
  quantity: 1,
  setQuantity: fn(),
};

const twoItemsStub: QuantityStepperProps = {
  ...oneItemStub,
  quantity: 2,
};

const maximumReachedStub: QuantityStepperProps = {
  ...oneItemStub,
  maximum: 2,
  quantity: 2,
};

const oneSkuPerProductTwoQtyStub: QuantityStepperProps = {
  ...twoItemsStub,
  onlyAllowRemoval: true,
};

export default <Record<string, QuantityStepperProps>>{
  maximumReachedStub,
  oneItemStub,
  oneSkuPerProductTwoQtyStub,
  twoItemsStub,
};
