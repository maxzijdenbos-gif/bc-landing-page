import { FormEvent, useState } from 'react';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  id: string;
  isDirty: boolean;
  isValid: boolean;
  onSubmit: () => Promise<void>;
}

const Form = ({ isDirty, isValid, onSubmit, children, ...rest }: FormProps) => {
  const [formWasTouched, setFormWasTouched] = useState(false);

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    onSubmit();

    if (!isValid) return;
  };

  if (isDirty && !formWasTouched) {
    setFormWasTouched(true);
  }

  return (
    <form {...rest} onSubmit={handleOnSubmit}>
      {children}
    </form>
  );
};

Form.displayName = 'Form';
export default Form;
