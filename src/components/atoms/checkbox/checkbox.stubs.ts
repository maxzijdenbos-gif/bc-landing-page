import { CheckboxProps } from './checkbox';

const defaultStub: CheckboxProps = { defaultChecked: false };

export default <Record<string, CheckboxProps>>{
  default: defaultStub,
};
