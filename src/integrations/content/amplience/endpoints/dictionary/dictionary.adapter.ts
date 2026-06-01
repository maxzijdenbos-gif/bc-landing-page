import { DictionaryProps, DictionaryResponse } from './dictionary.types';

export const dictionaryAdapter = (
  response: DictionaryResponse,
): DictionaryProps => {
  if (!response || typeof response !== 'object') {
    throw 'no response provided';
  }

  return {
    default: response.global,
    localizedDictionary: response.localizedDictionary,
  };
};
