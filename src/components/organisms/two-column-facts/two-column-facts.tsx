import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import Row from 'components/utilities/row/row';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import { ComponentPropsIntoTextLinesFunction } from 'libraries/utilities/schemas/news-article-schema';
import styles from './two-column-facts.module.scss';

export interface TwoColumnFactsProps extends ModuleWrapperProps {
  facts?: {
    description?: string;
    title?: string;
  }[];
  headline?: string;
}

const TwoColumnFacts = ({ facts, headline, ...rest }: TwoColumnFactsProps) => {
  // start reveal animation triggers
  const { domNode: headlineNode, isViewed: headlineIsViewed } =
    useIntersectionObserver({
      rootMargin: '-10% 0% -10% 0%',
      unObserveOnThreshold: 0,
    });
  const { domNode: factsNode, isViewed: factsIsViewed } =
    useIntersectionObserver({
      rootMargin: '-10% 0% -10% 0%',
      unObserveOnThreshold: 0,
    });
  // end reveal animation triggers

  return (
    <ModuleWrapper className={styles.component} {...rest}>
      <Container>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              laptop: 3,

              tablet: 1,
            }}
            width={{
              laptop: 6,

              tablet: 10,
            }}
          >
            <div ref={headlineNode}>
              {headline && (
                <MotionSlide direction="up" initMotion={headlineIsViewed}>
                  <Typography
                    className={styles.headline}
                    tag="h2"
                    tagStyle="displaySmall"
                  >
                    {headline}
                  </Typography>
                </MotionSlide>
              )}
            </div>
            {!!facts?.length && (
              <div ref={factsNode}>
                <MotionSlide direction="up" initMotion={factsIsViewed}>
                  <div className={styles.facts}>
                    {facts.map(({ title, description }, index) => (
                      <div key={index} className={styles.fact}>
                        <Typography
                          className={styles.title}
                          tag="p"
                          tagStyle="bodyMedium"
                          weight="bold"
                        >
                          {title}
                        </Typography>
                        <Typography
                          className={styles.description}
                          tag="p"
                          tagStyle="bodyMedium"
                        >
                          {description}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </MotionSlide>
              </div>
            )}
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

TwoColumnFacts.displayName = 'TwoColumnFacts';

export const TwoColumnFactsIntoTextLines: ComponentPropsIntoTextLinesFunction<
  TwoColumnFactsProps
> = (lines, { facts, headline }) => {
  if (headline) lines.push(headline);

  if (!facts) return;

  for (const { description, title } of facts) {
    if (title) lines.push(title);
    if (description) lines.push(description);
  }
};

export default TwoColumnFacts;
