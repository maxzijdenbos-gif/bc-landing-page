import { RadioCardProps } from './radio-card';

const defaultStub: RadioCardProps = {
  groupName: 'test',
  value: 'value1',
};

export default <Record<string, RadioCardProps>>{
  default: defaultStub,
};
