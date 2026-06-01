import classNames from 'classnames';
import Typography from 'components/atoms/typography/typography';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import styles from './lead-paragraph.module.scss';

export interface LeadParagraphProps {
  className?: string;
  text: string;
}

const LeadParagraph = ({ className, text }: LeadParagraphProps) => {
  const { domNode, isViewed } = useIntersectionObserver({
    rootMargin: '-30% -0%',
    unObserveOnThreshold: 0.1,
  });

  return (
    <div ref={domNode} className={classNames(styles.component, className)}>
      <MotionSlide direction="up" initMotion={isViewed}>
        <Typography tag="p" tagStyle="bodyXLarge" weight="bold">
          {text}
        </Typography>
      </MotionSlide>
    </div>
  );
};

LeadParagraph.displayName = 'LeadParagraph';

export default LeadParagraph;
