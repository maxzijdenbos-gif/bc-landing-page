import { PriceProps } from './price';

const defaultStub: PriceProps = {
  currency: 'USD',
  locale: 'en-US',
  value: 1234.56,
};

const negativeStub: PriceProps = {
  currency: 'EUR',
  locale: 'de-DE',
  value: -1234.56,
};

const mutedStrikethroughStub: PriceProps = {
  currency: 'EUR',
  locale: 'nl-NL',
  strikethrough: true,
  value: 1234.56,
  variant: 'muted',
};

const importantStub: PriceProps = {
  currency: 'JPY',
  locale: 'ja-JP',
  size: 'medium',
  value: 1234567,
  variant: 'important',
};

export default <Record<string, PriceProps>>{
  default: defaultStub,
  important: importantStub,
  mutedStrikethrough: mutedStrikethroughStub,
  negative: negativeStub,
};
