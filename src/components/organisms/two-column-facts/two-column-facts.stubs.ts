import { TwoColumnFactsProps } from './two-column-facts';

const defaultStub: TwoColumnFactsProps = {
  facts: ['First', 'Second', 'Third'].map((name) => ({
    description: `${name} Fact Description`,
    title: `${name} Fact Title`,
  })),
  headline: 'headline',
};

export default <Record<string, TwoColumnFactsProps>>{
  default: defaultStub,
};
