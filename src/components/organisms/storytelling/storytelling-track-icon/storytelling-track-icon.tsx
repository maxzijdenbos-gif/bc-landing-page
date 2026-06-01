import classNames from 'classnames';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { MutableRefObject, useEffect, useId } from 'react';
import * as ExplorePagesTrackIcons from 'assets/media/explore-pages/progress-tracks';
import styles from './storytelling-track-icon.module.scss';

type TrackNames = keyof typeof ExplorePagesTrackIcons;
// Since the mobile names are only used for UI, they will not come from data
type MainTrackTypes = Exclude<
  TrackNames,
  | 'cityFitnessMobile'
  | 'crossGravelMobile'
  | 'mountainMobile'
  | 'roadMobile'
  | 'kidsMobile'
>;

interface TrackIcon {
  className?: string;
  gradient?: boolean;
  id?: string;
  isMobile?: boolean;
  moduleRef?: MutableRefObject<HTMLDivElement | null>;
  name: MainTrackTypes;
}

const StorytellingTrackIcon = ({
  isMobile,
  id,
  name,
  className,
  moduleRef,
  gradient = false,
}: TrackIcon) => {
  const instanceId = useId();
  const regulatedName: TrackNames = isMobile ? `${name}Mobile` : name;
  const IconComponent = ExplorePagesTrackIcons[regulatedName];
  const svgPathLength = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
    target: moduleRef,
  });
  const stroke = useTransform(() => {
    if (svgPathLength.get() <= 0) {
      return 0;
    }

    const startProgress = svgPathLength.get() * (scrollYProgress.get() * -1); // We wanna go in reversed order because of dashoffset
    const startFrom = svgPathLength.get();
    const finalCalculation = startFrom + startProgress;

    return finalCalculation;
  });

  useEffect(() => {
    const handleResize = () => {
      const getPathLength = moduleRef?.current
        ?.querySelector<SVGPathElement>(`#${id}`)
        ?.getTotalLength();

      if (!getPathLength) {
        svgPathLength.set(0);

        return;
      }

      svgPathLength.set(getPathLength);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleRef]);

  const iconInstance = <IconComponent />;

  if (!IconComponent) return null;
  const svgPath = iconInstance?.props?.children?.props?.d;
  const svgDashArray = iconInstance?.props?.children?.props?.strokeDasharray;
  const svgStrokeWidth = isMobile ? '2' : '3'; // It was not possible to use the stroke from the svg
  const svhViewBox = iconInstance?.props.viewBox;

  if (!svgPath) return null;

  const paint0Id = id ? `${id}-paint0` : `paint0-${instanceId}`;
  const paint1Id = id ? `${id}-paint1` : `paint1-${instanceId}`;
  const maskId = id ? `${id}-mask` : `mask-${instanceId}`;

  return (
    <motion.svg
      className={classNames(styles.component, className)}
      fill="none"
      height="100%"
      style={{
        strokeDasharray: svgPathLength,
        strokeDashoffset:
          moduleRef?.current && svgPathLength ? stroke : undefined,
      }}
      viewBox={svhViewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradient && (
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={paint0Id}
            x1="0%"
            x2="0"
            y1="100%"
            y2="0%"
          >
            <stop className={styles.endGradientColor} />
            <stop className={styles.startGradientColor} offset="0.5" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={paint1Id}
            x1="0%"
            x2="0"
            y1="100%"
            y2="0%"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.265" stopColor="white" stopOpacity="0.6" />
            <stop offset="0.665" stopColor="white" stopOpacity="0" />
            <stop offset="0.775" stopColor="white" />
            <stop offset="0.94" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      <path
        d={svgPath}
        mask={svgDashArray ? `url(#${maskId})` : undefined}
        stroke={gradient ? `url(#${paint0Id})` : 'white'}
        strokeLinecap="square"
        strokeWidth={svgStrokeWidth}
      />
      <path
        d={svgPath}
        id={id}
        mask={svgDashArray ? `url(#${maskId})` : undefined}
        stroke={gradient ? `url(#${paint1Id})` : 'white'}
        strokeLinecap="square"
        strokeWidth={svgStrokeWidth}
      />

      {svgDashArray && (
        <mask id={maskId}>
          <rect fill="black" height="100%" width="100%" />
          <path
            d={svgPath}
            fill="none"
            stroke="white"
            strokeDasharray={svgDashArray}
            strokeLinecap="square"
            strokeWidth={svgStrokeWidth}
          />
        </mask>
      )}
    </motion.svg>
  );
};

StorytellingTrackIcon.displayName = 'StorytellingTrackIcon';
export default StorytellingTrackIcon;
