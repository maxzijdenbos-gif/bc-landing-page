import { merge } from 'lodash';
import fallbackDictionary from 'mocks/endpoints/dictionary/data/fallback';
import { getContentDeliveryKey } from '../get-content/get-content-delivery-key';
import { dictionaryAdapter } from './dictionary.adapter';
import type {
  DictionaryEntry,
  DictionaryEntryLocalized,
} from './dictionary.types';

const GLOBAL_DICTIONARY_DELIVERY_KEY = 'global-dictionary';

const localeDictionaryDeliveryKey = (locale: Locale) => {
  return `${locale}-dictionary`;
};

const fetchDictionaryRaw = async (
  locale: Locale,
  slug: string,
  stagingEnv?: string,
) => {
  return await getContentDeliveryKey<Record<string, unknown>>({
    locale,
    slug,
    stagingEnvironment: stagingEnv,
  });
};

/**
 * Read `dictionary` from an Amplience content item without throwing.
 * Unknown sections, extra labels, and non-string values are skipped; structure issues yield {}.
 */
function baselineLabelKeys(section: keyof DictionaryEntry): Set<string> {
  const block = fallbackDictionary[section];
  if (!block || typeof block !== 'object') return new Set();
  return new Set(Object.keys(block as Record<string, unknown>));
}

const baselineSectionKeys = Object.keys(
  fallbackDictionary,
) as (keyof DictionaryEntry)[];

/** Warn when global CMS payload is missing sections/labels vs fallback (merge still fills gaps). */
function warnGlobalDictionaryDrift(
  cms: DictionaryEntryLocalized,
  deliveryKey: string,
) {
  for (const section of baselineSectionKeys) {
    const cmsSection = cms[section as string];
    const expected = baselineLabelKeys(section);

    if (!cmsSection) {
      console.warn(
        `[dictionary] Global CMS missing entire section (${deliveryKey}): ${String(
          section,
        )} (using fallback).`,
      );
      continue;
    }

    for (const label of expected) {
      if (!(label in cmsSection)) {
        console.warn(
          `[dictionary] Global CMS missing label (${deliveryKey}): ${String(
            section,
          )}.${label} (using fallback).`,
        );
      }
    }
  }

  for (const section of Object.keys(cms)) {
    if (!(section in fallbackDictionary)) {
      console.warn(
        `[dictionary] Global CMS unknown section (${deliveryKey}): ${section}`,
      );
      continue;
    }
    const expected = baselineLabelKeys(section as keyof DictionaryEntry);
    for (const label of Object.keys(cms[section])) {
      if (!expected.has(label)) {
        console.warn(
          `[dictionary] Global CMS unknown label (${deliveryKey}): ${section}.${label}`,
        );
      }
    }
  }
}

/** Localized overrides are partial; only warn on unknown sections/labels vs baseline. */
function warnLocalizedDictionaryDrift(
  cms: DictionaryEntryLocalized,
  deliveryKey: string,
) {
  for (const section of Object.keys(cms)) {
    if (!(section in fallbackDictionary)) {
      console.warn(
        `[dictionary] Localized CMS unknown section (${deliveryKey}): ${section}`,
      );
      continue;
    }
    const expected = baselineLabelKeys(section as keyof DictionaryEntry);
    for (const label of Object.keys(cms[section])) {
      if (!expected.has(label)) {
        console.warn(
          `[dictionary] Localized CMS unknown label (${deliveryKey}): ${section}.${label}`,
        );
      }
    }
  }
}

function coerceAmplienceDictionary(
  raw: Record<string, unknown>,
  deliveryKey: string,
  options?: { warnIfDictionaryMissing?: boolean },
): DictionaryEntryLocalized {
  const dict = raw.dictionary;
  if (dict === undefined || dict === null) {
    if (options?.warnIfDictionaryMissing) {
      console.warn(
        `[dictionary] No dictionary field in CMS response (${deliveryKey}); using fallback only.`,
      );
    }
    return {};
  }
  if (typeof dict !== 'object' || Array.isArray(dict)) {
    console.warn(
      `[dictionary] Expected dictionary object (${deliveryKey}), got ${typeof dict}. Ignoring CMS dictionary.`,
    );
    return {};
  }

  const out: DictionaryEntryLocalized = {};
  for (const [sectionKey, sectionVal] of Object.entries(dict)) {
    if (
      sectionVal === null ||
      typeof sectionVal !== 'object' ||
      Array.isArray(sectionVal)
    ) {
      console.warn(
        `[dictionary] Skipped invalid section value (${deliveryKey}): ${sectionKey}`,
      );
      continue;
    }
    const labels: Record<string, string> = {};
    for (const [labelKey, labelVal] of Object.entries(sectionVal)) {
      if (typeof labelVal === 'string') {
        labels[labelKey] = labelVal;
      } else if (labelVal !== undefined && labelVal !== null) {
        console.warn(
          `[dictionary] Skipped non-string label (${deliveryKey}): ${sectionKey}.${labelKey}`,
        );
      }
    }
    out[sectionKey] = labels;
  }
  return out;
}

export const getDictionary = async (locale: Locale, stagingEnv?: string) => {
  const [localeDictionary, globalDictionary] = await Promise.allSettled([
    fetchDictionaryRaw(locale, localeDictionaryDeliveryKey(locale), stagingEnv),
    fetchDictionaryRaw(locale, GLOBAL_DICTIONARY_DELIVERY_KEY, stagingEnv),
  ]);

  if (globalDictionary.status === 'rejected')
    throw Error(
      'Failed to fetch global dictionary with delivery key: ' +
        GLOBAL_DICTIONARY_DELIVERY_KEY,
    );

  const cmsGlobal = coerceAmplienceDictionary(
    globalDictionary.value,
    GLOBAL_DICTIONARY_DELIVERY_KEY,
    { warnIfDictionaryMissing: true },
  );
  warnGlobalDictionaryDrift(cmsGlobal, GLOBAL_DICTIONARY_DELIVERY_KEY);
  const global = merge({}, fallbackDictionary, cmsGlobal) as DictionaryEntry;

  const localeKey = localeDictionaryDeliveryKey(locale);
  const localizedDictionary: DictionaryEntryLocalized =
    localeDictionary.status === 'fulfilled'
      ? (() => {
          const cms = coerceAmplienceDictionary(
            localeDictionary.value,
            localeKey,
            {
              warnIfDictionaryMissing: true,
            },
          );
          warnLocalizedDictionaryDrift(cms, localeKey);
          return cms;
        })()
      : {};

  return dictionaryAdapter({
    global,
    localizedDictionary,
  });
};
