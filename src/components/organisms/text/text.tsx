import removeMarkdown from 'remove-markdown';
import RichText from 'components/atoms/rich-text/rich-text';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import { ComponentPropsIntoTextLinesFunction } from 'libraries/utilities/schemas/news-article-schema';
import ButtonList from '../button-list/button-list';
import styles from './text.module.scss';

export interface TextProps extends ModuleWrapperProps {
  buttonGroup?: BaseButton[];
  /** The text to show as a headline */
  headline?: string;
  /** The rich text to show as a description */
  text?: string;
}

const Text = ({
  anchorTarget,
  buttonGroup,
  color,
  headline,
  text,
}: TextProps) => {
  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={styles.component}
      color={color}
    >
      <Container>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              laptop: 3,
              mobile: 0,
              tablet: 1,
            }}
            width={{
              laptop: 6,
              mobile: 12,
              tablet: 10,
            }}
          >
            {text && (
              <RichText text={headline ? `# ${headline}\n${text}` : text} />
            )}
            {buttonGroup && (
              <ButtonList buttons={buttonGroup} className={styles.buttonList} />
            )}
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

Text.displayName = 'Text';

export const CopyIntoTextLines: ComponentPropsIntoTextLinesFunction<
  TextProps
> = (lines, { headline, text }) => {
  if (headline) lines.push(headline);
  if (text) lines.push(removeMarkdown(text));
};

export default Text;
