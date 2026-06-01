import classNames from 'classnames';
import { useI18n } from 'next-localization';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import PlayerButton from 'components/atoms/player-button/player-button';
import ContentBlocked from 'components/molecules/content-blocked/content-blocked';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import {
  trackCustomVideoComplete,
  trackCustomVideoStart,
  trackCustomVideoWatch,
} from 'integrations/tracking/google-tag-manager/scripts';
import { useCookieConsentContext } from 'libraries/contexts/cookie-consent-context';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import { getAllTabbableElements } from 'libraries/utilities/accessibility/get-all-tabbable-elements';
import { WistiaMedia } from 'pages/amplience/extensions/wistia-schema';
import styles from './embedded-video.module.scss';

const WISITA_TAG_ID = 'wistia-player';
const WISITA_PLAYER_SRC = '//fast.wistia.com/assets/external/E-v1.js';

export interface EmbeddedVideoProps extends ModuleWrapperProps {
  schema?: WistiaMedia;
  wistiaId?: string;
}

interface WistiaVideoApi {
  bind: <A = any, B = any>(
    eventType: string,
    callbackFn: (arg0: A, arg1: B) => void,
  ) => void;
  data: {
    media: {
      name: string;
    };
  };
  pause: () => void;
  play: () => void;
  unbind: () => void;
}

export interface WistiaEmbedConfig {
  id?: string;
  onEmbedded?: (video: WistiaVideoApi) => void;
  onHasData?: (video: WistiaVideoApi) => void;
  onReady?: (video: WistiaVideoApi) => void;
  options?: {
    controlsVisibleOnLoad?: boolean;
    playButton?: boolean;
    resumable?: boolean;
    videoFoam?: boolean;
    wmode?: 'transparent';
  };
  revoke?: WistiaEmbedConfig;
}

const addWistiaScript = () => {
  const scriptTag = document.createElement('script');

  scriptTag.id = WISITA_TAG_ID;
  scriptTag.src = WISITA_PLAYER_SRC;
  scriptTag.async = true;

  document.body.appendChild(scriptTag);
};

const removeWistiaScript = () => {
  const scriptTag = document.getElementById(WISITA_TAG_ID);

  if (scriptTag) {
    scriptTag.remove();
  }
};

const EmbeddedVideo = ({
  anchorTarget,
  color,
  wistiaId,
  schema: schemaMap,
}: EmbeddedVideoProps) => {
  const videoApi = useRef<WistiaVideoApi>(undefined);
  const videoRef = useRef<HTMLDivElement>(null);

  // Use localized version first, but fallback to non-localized.
  const schema = (schemaMap as unknown as Record<string, WistiaMedia>)?.[
    wistiaId || ''
  ]
    ? (schemaMap as unknown as Record<string, WistiaMedia>)?.[wistiaId || '']
    : schemaMap;

  const didReportWatch = useRef<Record<number, boolean>>({});

  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [wistiaMediaName, setWistiaMediaName] = useState<string | undefined>();
  const { t } = useI18n();

  const { acceptsStatisticCookies } = useCookieConsentContext();

  const { domNode: mediaWrapperRef, isIntersecting } = useIntersectionObserver(
    {},
  );

  const videoActive = acceptsStatisticCookies && videoStarted;

  useEffect(() => {
    if (!isIntersecting && videoActive) {
      videoApi.current?.pause();
    }
  }, [isIntersecting, videoActive]);

  // start handle keyboard navigation focues states
  const wistiaFirstTabbableElement = useRef<any>(null);

  const handleWistiaElementFocus = useCallback(() => {
    const tabbableElements = getAllTabbableElements(videoRef.current);

    if (buttonIsClicked && wistiaFirstTabbableElement.current) {
      wistiaFirstTabbableElement.current.tabIndex = 0;
      setTimeout(() => {
        // await until DOM is updated
        wistiaFirstTabbableElement.current?.focus();
      }, 300);
    } else if (tabbableElements?.[0]) {
      wistiaFirstTabbableElement.current = tabbableElements[0];
      tabbableElements[0].tabIndex = -1;
    }
  }, [buttonIsClicked]);

  useEffect(() => {
    handleWistiaElementFocus();
  }, [handleWistiaElementFocus]);

  // end of handle keyboard navigation focues states

  useEffect(() => {
    if (!wistiaId) return;
    const tagExists = !!document.getElementById(WISITA_TAG_ID);

    if (!acceptsStatisticCookies && tagExists) {
      removeWistiaScript();
    }
    const embedInitConfig: WistiaEmbedConfig = {
      id: wistiaId,
      onReady: (video: WistiaVideoApi) => {
        handleWistiaElementFocus();
        video.bind('play', function () {
          setVideoStarted(true);
        });
        video.bind<number, number>(
          'percentwatchedchanged',
          function (percentage: number, lastPercentage: number) {
            const title = schema?.name?.toLowerCase();

            // Duration is in whole seconds
            const duration = schema?.duration
              ? `${schema.duration.toFixed(0)}`.toLowerCase()
              : undefined;

            if (
              percentage >= 0.0 &&
              lastPercentage === 0 &&
              !didReportWatch.current[0]
            ) {
              didReportWatch.current[0] = true;

              return trackCustomVideoStart({
                videoDuration: duration,
                videoProvider: 'wistia',
                videoTitle: title,
              });
            }

            if (
              percentage >= 0.25 &&
              lastPercentage < 0.25 &&
              !didReportWatch.current[25]
            ) {
              didReportWatch.current[25] = true;

              return trackCustomVideoWatch({
                videoDuration: duration,
                videoPercent: '25%',
                videoProvider: 'wistia',
                videoTitle: title,
              });
            }
            if (
              percentage >= 0.5 &&
              lastPercentage < 0.5 &&
              !didReportWatch.current[50]
            ) {
              didReportWatch.current[50] = true;

              return trackCustomVideoWatch({
                videoDuration: duration,
                videoPercent: '50%',
                videoProvider: 'wistia',
                videoTitle: title,
              });
            }

            if (
              percentage >= 0.75 &&
              lastPercentage < 0.75 &&
              !didReportWatch.current[75]
            ) {
              didReportWatch.current[75] = true;

              return trackCustomVideoWatch({
                videoDuration: duration,
                videoPercent: '75%',
                videoProvider: 'wistia',
                videoTitle: title,
              });
            }

            if (
              percentage >= 1.0 &&
              lastPercentage < 1.0 &&
              !didReportWatch.current[100]
            ) {
              didReportWatch.current[100] = true;

              return trackCustomVideoComplete({
                videoDuration: duration,
                videoProvider: 'wistia',
                videoTitle: title,
              });
            }
          },
        );
        videoApi.current = video;
        setWistiaMediaName(video.data.media.name);
      },
      options: {
        controlsVisibleOnLoad: false,
        playButton: false,
        resumable: false,
        videoFoam: true,
        wmode: 'transparent',
      },
    };
    const getWistiaPlayerApi = () => {
      window._wq = window._wq || [];
      window._wq.push(embedInitConfig);
    };

    !tagExists && addWistiaScript();

    getWistiaPlayerApi();

    return () => {
      window._wq.push({ revoke: embedInitConfig });
    };
  }, [acceptsStatisticCookies, handleWistiaElementFocus, schema, wistiaId]);

  const playVideo = () => {
    videoApi.current?.play();
  };

  // Is undefined or hashedId does not match the higher-level wistiaId from the editor, we can assume the ID is not valid.
  if ((schema?.hashedId || '') !== wistiaId) return null;

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
    >
      <Container className={styles.container}>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              desktop: 2,
              laptop: 1,
              tablet: 1,
            }}
            width={{
              desktop: 8,
              laptop: 10,
              tablet: 10,
            }}
          >
            <ParallaxWrapper
              minOpacity={0}
              observerOffset={'startEndStartCenter'}
              translateYStartEnd={'15vhTo0vh'}
            >
              {acceptsStatisticCookies ? (
                <React.Fragment>
                  <div className={styles.buttonWrapper}>
                    <PlayerButton
                      ariaLabel={`${t('video.play')}: ${
                        wistiaMediaName ?? schema?.name ?? ''
                      }`}
                      className={classNames(styles.playButton, {
                        [styles.isHidden]: videoActive,
                      })}
                      iconName={'Play_32'}
                      isActive={buttonIsClicked}
                      onClick={() => {
                        setButtonIsClicked(true);
                        playVideo();
                      }}
                      tabIndex={videoActive ? -1 : 0}
                    />
                  </div>
                  <div
                    ref={mediaWrapperRef}
                    className={classNames(styles.mediaWrapper)}
                    style={{ aspectRatio: schema?.aspectRatio ?? 0 }}
                  >
                    <div
                      className={classNames(styles.overlay, {
                        [styles.isHidden]: videoActive,
                      })}
                    />

                    <div
                      ref={videoRef}
                      className={classNames(
                        `wistia_embed wistia_async_${wistiaId}`,
                      )}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div ref={mediaWrapperRef}>
                  <ContentBlocked
                    missingAcceptOfCookieCategories={['statistic']}
                    style={{ aspectRatio: schema?.aspectRatio ?? 0 }}
                  />
                </div>
              )}
            </ParallaxWrapper>
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

EmbeddedVideo.displayName = 'EmbeddedVideo';

export default EmbeddedVideo;
