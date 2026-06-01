import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import removeMarkdown from 'remove-markdown';
import slugify from 'slugify';
import RichText from 'components/atoms/rich-text/rich-text';
import Typography from 'components/atoms/typography/typography';
import Accordion from 'components/molecules/accordion/accordion';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import useHash from 'libraries/hooks/use-hash';
import { ComponentPropsIntoTextLinesFunction } from 'libraries/utilities/schemas/news-article-schema';
import styles from './module-accordion.module.scss';

export interface ModuleAccordionItemProps {
  id?: string; // If not present, will generate one with slugify based on the title
  richText: string;
  title: string;
}

export interface ModuleAccordionProps extends ModuleWrapperProps {
  headline: string;
  items: ModuleAccordionItemProps[];
}

const getItemId = (item: ModuleAccordionItemProps) =>
  item.id ? item.id : slugify(item.title);

const ModuleAccordion = ({
  anchorTarget,
  color,
  headline,
  items,
}: ModuleAccordionProps) => {
  // Fully hydrate accordion data with functionality
  const { hash, isReady: hashIsReady, setHash, clearHash } = useHash();
  const initialView = useRef(true);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const accordionItems = items.map((item, index) => {
    const itemId = getItemId(item);

    return (
      <Accordion.AccordionItem
        key={itemId}
        id={itemId}
        isActive={index === activeIndex}
        onToggle={() => {
          if (index === activeIndex) {
            clearHash();
            setActiveIndex(-1);
          } else {
            setHash(itemId);
            setActiveIndex(index);
          }
        }}
        title={item.title}
      >
        {item.richText && <RichText text={item.richText} />}
      </Accordion.AccordionItem>
    );
  });

  // Use-effect that will run only once. Given hash is not async we can safely do this.
  // It will set the initially expanded item to be based on the hash OR failing that use the first item.
  // If a hash match is found, it will also scroll down to it.
  useEffect(() => {
    if (!initialView.current || !hashIsReady) return;
    initialView.current = false;

    let targetItem = 0;

    for (let index = 0; index < accordionItems.length; index++) {
      const id = getItemId(items[index]);

      if (id === hash) {
        window.document
          .getElementById(`${id}-heading`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetItem = index;

        break;
      }
    }

    queueMicrotask(() => setActiveIndex(targetItem));
  }, [accordionItems.length, hash, hashIsReady, items]);

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={classNames(styles.component)}
      color={color}
      role="presentation"
    >
      <Container>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              desktop: 3,
              laptop: 3,
              mobile: 0,
              tablet: 3,
            }}
            width={{
              desktop: 6,
              laptop: 6,
              mobile: 12,
              tablet: 6,
            }}
          >
            {headline && (
              <Typography
                className={styles.headline}
                tag={'h2'}
                tagStyle="displaySmall"
                weight="heavy"
              >
                {headline}
              </Typography>
            )}
            <Accordion accordionTrackingTitle={headline}>
              {accordionItems}
            </Accordion>
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

ModuleAccordion.displayName = 'ModuleAccordion';

export const ModuleAccordionIntoTextLines: ComponentPropsIntoTextLinesFunction<
  ModuleAccordionProps
> = (lines, { headline, items }) => {
  if (headline) lines.push(headline);

  for (const item of items) {
    if (item.title) {
      lines.push(item.title);
    }
    if (item.richText) {
      lines.push(removeMarkdown(item.richText));
    }
  }
};

export default ModuleAccordion;
