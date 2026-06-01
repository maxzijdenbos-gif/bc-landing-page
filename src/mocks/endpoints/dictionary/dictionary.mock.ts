import { dictionaryAdapter } from 'integrations/content/amplience/endpoints/dictionary/dictionary.adapter';
import { DictionaryResponse } from 'integrations/content/amplience/endpoints/dictionary/dictionary.types';
import en from './data/en';
import fallback from './data/fallback';

const dictionaryMock: DictionaryResponse = {
  global: fallback,
  localizedDictionary: en,
};

export default dictionaryAdapter(dictionaryMock);
