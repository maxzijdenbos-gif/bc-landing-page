import { ControlButtonArrowProps } from './arrow/arrow';
import { ControlButtonPaginationProps } from './pagination/pagination';

interface ControlButtonsProps {
  next: ControlButtonArrowProps;
  pagination: ControlButtonPaginationProps;
  previous: ControlButtonArrowProps;
}

const defaultStub: ControlButtonsProps = {
  next: {
    iconName: 'ArrowRight_32',
    label: 'Right',
    onClick: () => {
      /**/
    },
  },
  pagination: {
    current: 0,
    total: 10,
  },
  previous: {
    iconName: 'ArrowLeft_32',
    label: 'Right',
    onClick: () => {
      /**/
    },
  },
};

export default <Record<string, ControlButtonsProps>>{
  default: defaultStub,
};
