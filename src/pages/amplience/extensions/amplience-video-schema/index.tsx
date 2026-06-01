import { ImageUrlBuilder, Video as VideoConstructor } from 'dc-delivery-sdk-js';
import { getImageProps } from 'next/image';
import { useRef } from 'react';
import UseContentFieldExtension from 'integrations/content/amplience/hooks/use-content-field-extension';
import { AmplienceMediaPayload } from 'integrations/content/amplience/types/content-types';
import withIframeRestriction from 'libraries/hocs/with-iframe-restriction';

export interface AmplienceVideoSchema {
  description: string;
  fallbackSrc: string;
  posterSrc?: string;
  sources: { format: string; src: string }[];
  title: string;
}

interface AmplienceVideoProfilesProps {
  id: string;
  media: {
    format: string;
    height: string;
    profile: string;
    profileLabel: string;
    protocol: string;
    size: string;
    src: string;
    updated: number;
    'video.codec.': string;
    width: string;
  }[];
  meta: {
    description: string;
    duration: number;
    mainLink: null;
    mainThumb: {
      src: string;
    };
    title: string;
    updated: string;
  };
  thumbs: {
    src: string;
    time: number;
  }[];
}

const PREFERRED_ORDER_OF_VIDEO_FORMATS = ['webm', 'mpeg4'];
const FALLBACK_FORMAT = 'mpeg4'; // This is chosen to set the src property on video for solving Safari pixelation bug

const httpsAsset = (url: string): string => `${url}?protocol=https`;

const AmplienceVideoSchema = () => {
  const controller = useRef(new AbortController());
  const isFetching = useRef(false);
  const videoRef = useRef<AmplienceMediaPayload['video'] | null>(null);
  const videoId = useRef<string | null>(null);

  UseContentFieldExtension<AmplienceVideoSchema | undefined>({
    onFormChange: async (form, { field, frame, params }) => {
      const video =
        form?.[(params as { target?: string })?.target || 'videoObject'];

      if (videoId.current === video?.videoId) return;
      videoId.current = video?.videoId;

      frame.setHeight(0);
      videoRef.current =
        form?.[
          (params.instance as { target?: string })?.target || 'videoObject'
        ];

      if (isFetching.current) {
        controller.current.abort();
      } else {
        isFetching.current = true;
      }

      if (!videoRef.current) return (isFetching.current = false);

      const dcVideo = new VideoConstructor(videoRef.current, {});
      const url = new ImageUrlBuilder(dcVideo).build();
      const videoMetaUrl = httpsAsset(`${url}.json`);
      const res = await fetch(videoMetaUrl);

      if (res.status !== 200) {
        throw new Error(
          `Unable to parse video meta data, API responded with a ${res.status}`,
        );
      }

      const videoProfiles: AmplienceVideoProfilesProps = await res.json();

      const {
        props: { src: posterSrc },
      } = getImageProps({
        alt: videoProfiles.meta.title ?? '',
        fill: true,
        src: videoProfiles.meta.mainThumb?.src ?? '',
      });

      if (!videoProfiles.media || videoProfiles.media.length < 1) {
        return field.setValue({
          description: videoProfiles.meta.description,
          fallbackSrc: '',
          posterSrc,
          sources: [],
          title: videoProfiles.meta.title,
        });
      }
      const videoSources = videoProfiles.media
        .filter(
          (media: { profileLabel: string }) => media.profileLabel === 'High',
        )
        .sort(
          (a, b) =>
            PREFERRED_ORDER_OF_VIDEO_FORMATS.indexOf(a.format) -
            PREFERRED_ORDER_OF_VIDEO_FORMATS.indexOf(b.format),
        )
        .map(
          (media: {
            format: string;
            src: string;
          }): { format: string; isFallback: boolean; src: string } => {
            return {
              format: media.format === 'mpeg4' ? 'mp4' : media.format,
              isFallback: media.format === FALLBACK_FORMAT,
              src: httpsAsset(media.src),
            };
          },
        );

      return field.setValue({
        description: videoProfiles.meta.description,
        fallbackSrc:
          videoSources.find((source) => source.isFallback)?.src ?? '',
        posterSrc,
        sources: videoSources,
        title: videoProfiles.meta.title,
      });
    },
  });

  return undefined;
};

export default withIframeRestriction(AmplienceVideoSchema);
