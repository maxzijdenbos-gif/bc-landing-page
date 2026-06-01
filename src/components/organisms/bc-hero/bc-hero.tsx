import { useEffect, useRef, useState } from 'react';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import AnchorMenu, {
  AnchorMenuProps,
} from 'components/molecules/anchor-menu/anchor-menu';
import Container from 'components/utilities/container/container';
import styles from './bc-hero.module.scss';

export interface BCHeroProps {
  anchorList?: AnchorMenuProps['anchorList'];
}

const BCHero = ({ anchorList }: BCHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className={styles.wrapper} data-color="secondary">
      <section className={styles.component} ref={componentRef}>
        <div className={styles.mediaLayer}>
          <video
            ref={videoRef}
            autoPlay
            className={styles.video}
            loop
            muted
            playsInline
            src="/videos/BC_Video.mp4"
          />
          <div className={styles.overlay} />
        </div>

        <Container className={styles.container}>
          <div className={styles.headlineArea}>
            <Typography
              className={styles.title}
              tag="h1"
              tagStyle="displayXLarge"
            >
              <span className={styles.titleLine}>Crafted for You</span>
              <span className={styles.titleLine}>Defined by You</span>
            </Typography>
          </div>

          <div className={styles.contentArea}>
            <Typography
              className={styles.heroText}
              tag="p"
              tagStyle="headlineSmall"
              weight="bold"
            >
              With Giant&apos;s Customization Service, create a bike that&apos;s
              truly yours. From paint finish to core components, define your
              unique style. Your ride, your identity.
            </Typography>

            <button
              className={styles.ctaButton}
              type="button"
              onClick={() =>
                document
                  .getElementById('shop-series')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              <span aria-hidden className={styles.colorSwatch}>
                <img
                  alt=""
                  className={styles.colorSwatchImage}
                  src="/images/Customize_color_swatch.png"
                />
              </span>
              <Typography
                className={styles.ctaLabel}
                tag="span"
                tagStyle="actionMedium"
                weight="heavy"
              >
                START YOUR CUSTOM JOURNEY
              </Typography>
            </button>
          </div>
        </Container>

        <div className={styles.pauseArea}>
          <Button
            aria-label={isPaused ? 'Play video' : 'Pause video'}
            innerClassName={styles.pauseButtonInner}
            leftIcon={isPaused ? 'Play_24' : 'Pause_24'}
            onClick={toggleVideo}
            size="large"
            variant="Tertiary"
          />
        </div>

        {anchorList && (
          <AnchorMenu
            anchorList={anchorList}
            className={styles.anchorMenuHero}
            topElement={componentRef}
          />
        )}
      </section>
    </div>
  );
};

BCHero.displayName = 'BCHero';

export default BCHero;
