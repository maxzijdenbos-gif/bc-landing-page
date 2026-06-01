import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
import { useEffect, useRef, useState } from 'react';
import RichText from 'components/atoms/rich-text/rich-text';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import useWindowSize from 'libraries/hooks/dom/use-window-size';
import styles from './table.module.scss';

export interface TableProps extends ModuleWrapperProps {
  description?: string; // Might be markdown instead
  fixTabelLayoutDesktop?: boolean;
  headline: string;
  table: string;
  tableTheme?: 'Brand colors' | 'None';
}

const Table = ({
  anchorTarget,
  description,
  fixTabelLayoutDesktop,
  headline,
  tableTheme,
  table,
}: TableProps) => {
  const { windowWidth } = useWindowSize();

  // For handling custom scroll bar
  const [tableHasScroll, setTableHasScroll] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableRef.current || !scrollContainerRef.current) return;
    setTableHasScroll(
      scrollContainerRef.current?.offsetWidth <
        Math.floor(tableRef.current.getBoundingClientRect().width),
    );
  }, [windowWidth, tableRef]);

  // eslint-disable jsx-a11y/no
  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={classNames(styles.component, {
        [styles.hasScroll]: tableHasScroll,
      })}
      color={'quinary'}
    >
      <Container>
        <Row outerGutter={{ laptop: 'none', mobile: 'medium' }}>
          <Column
            className={styles.contentContainer}
            offset={{
              laptop: 1,
            }}
            width={{
              laptop: 10,
            }}
          >
            {headline && (
              <Typography tagStyle="displaySmall">{headline}</Typography>
            )}
            <div
              ref={scrollContainerRef}
              className={classNames(styles.scrollContainer, {
                [styles.doBrandColor]: tableTheme === 'Brand colors',
                [styles.fixTabelLayoutDesktop]: fixTabelLayoutDesktop,
              })}
            >
              {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
              <div
                ref={tableRef}
                className={styles.tableContainer}
                tabIndex={0}
              >
                <Markdown>{table}</Markdown>
              </div>
              {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
            </div>
            {description && (
              <Typography
                className={styles.description}
                fontStyle="italic"
                tagStyle="bodySmall"
              >
                <RichText text={description} />
              </Typography>
            )}
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

Table.displayName = 'Table';

export default Table;
