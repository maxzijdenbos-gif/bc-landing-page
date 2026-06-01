import classNames from 'classnames';
import { ChangeEvent, createContext, ReactElement, useContext } from 'react';
import styles from './radio-group.module.scss';

export interface RadioGroupProps {
  children?: ReactElement<any> | ReactElement<any>[];
  /** Custom styling */
  className?: string;
  /** Selected value from parent state */
  selected?: string;
  /** Select function from parent */
  setSelected: (value: string) => void;
}

const RadioContext = createContext<string | undefined | null>(null);

export function useRadioContext() {
  const context = useContext(RadioContext);

  if (context === null) {
    throw new Error(
      `Radio components cannot be rendered outside the Radio Group component`,
    );
  }

  return context;
}

const RadioGroup = ({
  children,
  selected,
  setSelected,
  className,
}: RadioGroupProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div
      className={classNames(styles.component, className)}
      onChange={handleOnChange}
    >
      <RadioContext.Provider value={selected}>{children}</RadioContext.Provider>
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
