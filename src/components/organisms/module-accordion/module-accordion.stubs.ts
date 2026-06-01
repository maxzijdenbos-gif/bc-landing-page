import { ModuleAccordionProps } from './module-accordion';

const defaultStub: ModuleAccordionProps = {
  headline: 'Accordion to lorem ipsum',
  items: [
    {
      richText: `
## This is a subheadline
This is a newline
1. bullet
2. is
3. here
      `,
      title: 'Item without defined ID',
    },
    {
      id: 'custom-id',
      richText: 'There are no subheadlines here. Just text!',
      title: 'Item with a custom id',
    },
  ],
};

export default <Record<string, ModuleAccordionProps>>{
  default: defaultStub,
};
