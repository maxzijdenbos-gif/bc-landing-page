import UseContentFieldExtension from 'integrations/content/amplience/hooks/use-content-field-extension';
import { FALLBACK_LOCALE } from 'libraries/getters/get-locale';
import withIframeRestriction from 'libraries/hocs/with-iframe-restriction';

interface WistiaAuthor {
  authorName?: {
    values?: {
      locale?: string;
      value?: string;
    }[];
  };
  authorType?: string;
}

interface MediaMetadata {
  aspect_ratio?: number;
  av_stream_metadata?: string;
  average_bitrate?: number;
  early_max_bitrate?: number;
  frame_count?: number;
  frame_height?: number;
  frame_width?: number;
  max_bitrate?: number;
  served_by_media_api?: number;
}

interface Asset {
  bitrate: number;
  codec?: string;
  container?: string;
  created_at: number;
  details?: {
    audioDescription: boolean;
    languageMetadata: {
      name: string;
      nativeName: string;
      rightToLeft: boolean;
    };
  };
  display_name: string;
  ext?: string;
  height?: number;
  metadata?: MediaMetadata;
  opt_vbitrate?: number;
  progress: number;
  public: boolean;
  segment_duration?: number;
  size: number;
  slug: string;
  status: number;
  type: string;
  url: string;
  width?: number;
}

interface Transcript {
  alpha3_bibliographic: string;
  english_name: string;
  ietf_language_tag: string;
  iso639_2_language_code: string;
  language: string;
  native_name: string;
  right_to_left: boolean;
}

interface Caption {
  language: string;
  text: string;
}

interface EmbedOptions {
  audioDescriptionControl: string;
  bpbTime: string;
  branding: string;
  controlsVisibleOnLoad: string;
  fullscreenButton: string;
  playerColor: string;
  showCustomerLogo: string;
  stillUrl: string;
  thumbnailAltText: string;
  unalteredStillImageAsset: {
    height: string;
    url: string;
    width: string;
  };
  volumeControl: string;
  vulcan: boolean;
}

export interface WistiaMedia {
  accountId: number;
  accountKey: string;
  analyticsHost: string;
  aspectRatio: number;
  assets: Asset[];
  author?: WistiaAuthor[];
  availableTranscripts: Transcript[];
  branding: boolean;
  captions: Caption[];
  createdAt: number;
  distilleryUrl: string;
  duration: number;
  embedOptions: EmbedOptions;
  embed_options: EmbedOptions;
  enableCustomerLogo: boolean;
  firstEmbedForAccount: boolean;
  firstShareForAccount: boolean;
  hashedId: string;
  integrations: { google_analytics: boolean };
  mediaId: number;
  mediaKey: string;
  mediaType: string;
  name: string;
  playableWithoutInstantHls: boolean;
  privacyMode: boolean;
  progress: number;
  projectId: number;
  protected: boolean;
  seoDescription: string;
  showAbout: boolean;
  stats: {
    averageEngagement: number;
    loadCount: number;
    playCount: number;
    uniqueLoadCount: number;
    uniquePlayCount: number;
  };
  status: number;
  trackingTransmitInterval: number;
  type: string;
}

const WistiaSchema = () => {
  let ongoingFetchControllers: AbortController[] = [];
  const fetchedIds = new Map<string, any>();

  UseContentFieldExtension<WistiaMedia | undefined>({
    onFormChange: async (form, { field, frame }) => {
      // Cancel previous fetches
      ongoingFetchControllers.forEach((controller) => controller.abort());
      ongoingFetchControllers = [];

      // Try to get localized values first, but fallback to single-string wistia ID
      const wistiaValues =
        form?.wistiaId?.values || typeof form?.wistiaId === 'string'
          ? [{ locale: FALLBACK_LOCALE, value: form?.wistiaId }]
          : [];

      const authorData = form?.author?.[0];

      // Prime cache from existing field value
      const existingValues = field || {};

      Object.entries(existingValues).forEach(([id, data]) => {
        if (!fetchedIds.has(id)) {
          fetchedIds.set(id, data);
        }
      });

      const tasks = wistiaValues.map(
        async ({ locale, value }: { locale: string; value: string }) => {
          const authorName = authorData?.authorName?.values?.find(
            (v) => v.locale === locale,
          )?.value;
          const authorType = authorData?.authorType;

          if (fetchedIds.has(value)) {
            const cached = fetchedIds.get(value);

            return Promise.resolve([
              value,
              { ...cached, author: { authorName, authorType } },
            ] as const);
          }

          const controller = new AbortController();

          ongoingFetchControllers.push(controller);

          try {
            const response = await fetch(
              `https://fast.wistia.net/embed/medias/${value}.json`,
              {
                signal: controller.signal,
              },
            );
            const data = await response.json();
            const mediaWithAuthor = {
              ...data.media,
              author: { authorName, authorType },
            };

            fetchedIds.set(value, mediaWithAuthor);

            return [value, mediaWithAuthor] as const;
          } catch {
            return null;
          }
        },
      );

      frame?.setHeight(0);

      const results = (await Promise.all(tasks)).filter(Boolean) as [
        string,
        any,
      ][];

      const valueMap = Object.fromEntries(results);

      field.setValue(valueMap);
    },
  });

  return undefined;
};

export default withIframeRestriction(WistiaSchema);
