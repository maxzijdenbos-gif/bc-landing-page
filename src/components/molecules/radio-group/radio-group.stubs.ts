import { RadioGroupProps } from './radio-group';

const defaultStub: RadioGroupProps = {
  selected: 'value1',
  setSelected: (value) => console.log(value),
};

export default <Record<string, RadioGroupProps>>{
  default: defaultStub,
};
