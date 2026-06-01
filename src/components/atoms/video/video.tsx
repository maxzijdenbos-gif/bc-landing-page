import classNames from 'classnames';
import { ImageUrlBuilder, Video as VideoConstructor } from 'dc-delivery-sdk-js';
import { getImageProps } from 'next/image';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react';
import { AmplienceVideoPayload } from 'integrations/content/amplience/types/content-types';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import mergeRefs from 'libraries/utilities/merge-refs';
import { AmplienceVideoSchema } from 'pages/amplience/extensions/amplience-video-schema';
import styles from './video.module.scss';
/* eslint-disable jsx-a11y/media-has-caption */

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

interface Caption {
  /** Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate */
  default?: boolean;
  /** Kind of track */
  kind: 'captions' | 'subtitles' | 'descriptions';
  /** Specifies the title of the text track */
  label: 'English';
  /** Specifies the URL of the track file */
  src: string;
  /** lang code ISO 639-1 ex. da or en */
  srclang: string;
}

type AmplienceVideoProfileLabels = 'High' | 'Medium' | 'Low';
export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** text label for video */
  altText?: string;
  /** Indicates whether the video should play automatically */
  autoPlay?: boolean;
  /** Captions */
  captions?: Caption[];
  /** The class name to apply */
  className?: string;
  /** Indicates whether the video should show controls */
  controls?: boolean;
  /** Indicate if the video should loop */
  loop: boolean;
  /** If togglePlaying should be prevented, use this state. Ensure to pass null initially instead of false to account for low power mode handling */
  manuallyPaused?: boolean | null;
  /** callback to execute if no video is to be played */
  noVideoProfileCallback?: () => void;
  playsInline?: boolean;
  /** The source url of the video */
  src?: string;
  /** amplience video object  */
  videoObject?: AmplienceVideoPayload;
  /** amplience video object schema  */
  videoObjectSchema?: AmplienceVideoSchema;
  /** the video profile to render  */
  videoProfileLabel?: AmplienceVideoProfileLabels;
}

/**
 * Remember to include captions if the video have speech or other audio that is needed to understand the content.
 * WCAG 2.1 AA - https://www.w3.org/WAI/media/av/planning/
 */

const httpsAsset = (url: string): string => `${url}?protocol=https`;
const PREFERRED_ORDER_OF_VIDEO_FORMATS = ['webm', 'mpeg4'];
const FALLBACK_FORMAT = 'mpeg4'; // This is chosen to set the src property on video for solving Safari pixelation bug

export async function getVideoData(
  video: AmplienceVideoPayload,
  requestedProfileLabel: AmplienceVideoProfileLabels = 'High',
  noVideoProfileCallback?: () => void,
): Promise<{
  description: string;
  fallbackSrc: string;
  posterSrc?: string;
  sources: { format: string; src: string }[];
  title: string;
}> {
  const dcVideo = new VideoConstructor(video, {});
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
    noVideoProfileCallback?.();

    return {
      description: videoProfiles.meta.description,
      fallbackSrc: '',
      posterSrc,
      sources: [],
      title: videoProfiles.meta.title,
    };
  }
  const videoSources = videoProfiles.media
    .filter(
      (media: { profileLabel: string }) =>
        media.profileLabel === requestedProfileLabel,
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

  return {
    description: videoProfiles.meta.description,
    fallbackSrc: videoSources.find((source) => source.isFallback)?.src ?? '',
    posterSrc,
    sources: videoSources,
    title: videoProfiles.meta.title,
  };
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      altText,
      autoPlay = false,
      className,
      controls = false,
      id: videoId,
      loop = false,
      src,
      captions,
      playsInline = false,
      videoObject,
      videoObjectSchema,
      videoProfileLabel,
      manuallyPaused,
      noVideoProfileCallback,
      ...rest
    }: VideoProps,
    ref,
  ) => {
    const fallbackId = useId();
    const descriptionId = videoId
      ? `${videoId}-description`
      : `${fallbackId}-description`;
    const [videoData, setVideoData] = useState<any>(videoObjectSchema || null);

    const { domNode: videoRef, isIntersecting: videoIsIntersecting } =
      useIntersectionObserver({});
    const mergedRefs = mergeRefs([videoRef, ref]);

    useEffect(() => {
      if (!videoObject || videoObjectSchema) return;

      const getVideo = async () => {
        try {
          const videoRes = await getVideoData(
            videoObject,
            videoProfileLabel,
            noVideoProfileCallback,
          );
          setVideoData(videoRes);
        } catch {
          /* An error was thrown */
        }
      };

      getVideo();
    }, [
      noVideoProfileCallback,
      videoObject,
      videoProfileLabel,
      videoObjectSchema,
    ]);

    const handleVideoPlay = useCallback(
      (doPlay: boolean) => {
        if (doPlay) {
          videoRef.current?.play?.()?.catch(() => {
            /* Ignore failure state */
          });
        } else {
          videoRef.current?.pause?.()?.catch(() => {
            /* Ignore failure state */
          });
        }
      },
      [videoRef],
    );

    useEffect(() => {
      handleVideoPlay(!manuallyPaused);
    }, [manuallyPaused, handleVideoPlay]);

    useEffect(() => {
      if (!autoPlay) return;
      handleVideoPlay(!!videoIsIntersecting && !manuallyPaused);
    }, [
      videoIsIntersecting,
      videoData,
      handleVideoPlay,
      autoPlay,
      manuallyPaused,
    ]);

    return (
      <React.Fragment>
        <video
          {...rest}
          ref={mergedRefs}
          aria-describedby={videoData?.description ? descriptionId : undefined}
          aria-label={altText ?? undefined}
          className={classNames(styles.component, className)}
          controls={controls}
          loop={loop || autoPlay}
          muted={loop || autoPlay}
          playsInline={playsInline || autoPlay}
          poster={videoData?.posterSrc}
          preload={videoData?.posterSrc ? 'none' : undefined}
          src={videoData?.fallbackSrc}
        >
          {videoData?.sources?.map((video: { format: string; src: string }) => {
            return (
              <source
                key={video.src}
                src={video.src}
                type={`video/${video.format}`}
              />
            );
          })}
          {!!videoData?.sources?.length && src && (
            <source src={src} type="video/webm" />
          )}
          {captions &&
            captions.map((caption, captionIndex) => {
              return <track key={captionIndex} {...caption} />;
            })}
        </video>
        {videoData?.description && (
          <div className={'screenReaderOnly'} id={descriptionId}>
            {videoData?.description}
          </div>
        )}
      </React.Fragment>
    );
  },
);

Video.displayName = 'Video';

export default Video;
