import { ButtonListProps } from './button-list';

const defaultStub: ButtonListProps = {
  buttons: [
    {
      link: {
        linkText: 'Primary Action',
      },
      style: 'Primary',
    },
    {
      link: {
        linkText: 'Secondary Action',
      },
      style: 'Secondary',
    },
  ],
};

export default <Record<string, ButtonListProps>>{
  default: defaultStub,
};
