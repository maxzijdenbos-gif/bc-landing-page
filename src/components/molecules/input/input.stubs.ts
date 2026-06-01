import { InputProps } from './input';

const defaultStub: InputProps = {
  disabled: false,
  error: '',
  help: 'This is a help text',
  id: 'input',
  label: 'This is a label',
  onChange: () => console.log('onChange'),
  placeholder: 'This is a placeholder',
  value: '',
};

export default <Record<string, InputProps>>{
  default: defaultStub,
};
