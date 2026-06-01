import { ContentMeta } from '../../types/content-types';
import type { DictionaryEntry } from './dictionary.schema';

export type { DictionaryEntry };

/** Locale overrides: any subset of sections/labels; merged over global default in `_app`. */
export type DictionaryEntryLocalized = Record<string, Record<string, string>>;

export interface DictionaryAmplienceResponse {
  _meta?: ContentMeta;
  dictionary: DictionaryEntry;
}

export interface DictionaryResponse {
  global: DictionaryEntry;
  localizedDictionary: DictionaryEntryLocalized;
}

export interface DictionaryProps {
  default: DictionaryEntry;
  localizedDictionary: DictionaryEntryLocalized;
}
