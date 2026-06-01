import classNames from 'classnames';
import React, { forwardRef } from 'react';
import styles from './typography.module.scss';

type TypographyTag =
  | 'a'
  | 'blockquote'
  | 'button'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'li'
  | 'p'
  | 'small'
  | 'span';

export type TypographyStyle =
  | 'actionLarge'
  | 'actionMedium'
  | 'actionSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'bodyXLarge'
  | 'bodyXSmall'
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'displayXLarge'
  | 'displayXSmall'
  | 'displayXXLarge'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall';

type TypographyWeight = 'bold' | 'semiBold' | 'heavy';

const RECUT_TAGSTYLES: TypographyStyle[] = [
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'displayXLarge',
  'displayXXLarge',
  'displayXSmall',
];

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** The text to show */
  children?: React.ReactNode;
  /** Apply the Recut font to (first word) of the typography */
  /** Will only have effect on display font styles */
  doRecut?: boolean;
  /** The font-style property. Default normal. Restrictions is applied to which fontStyle and tagStyle can be combined. Check stylesheet */
  fontStyle?: 'italic';
  /** The id of the element the label is for */
  htmlFor?: string;
  /** Visually hide this text as it is intended for screen readers only */
  isScreenReaderOnly?: boolean;
  /** The html tag to be used for the typography */
  tag?: TypographyTag;
  /** The typography styling to be used */
  tagStyle?: TypographyStyle;
  /** The font weight styling to be used. Restrictions is applied to which tagStyle and weight can be combined. Check stylesheet */
  weight?: TypographyWeight;
}

const weights: Record<TypographyWeight, string> = {
  bold: styles.isBold,
  heavy: styles.isHeavy,
  semiBold: styles.isSemibold,
};

const fontStyles: { italic: string } = {
  italic: styles.isItalic,
};

const Typography = forwardRef(
  (
    {
      children,
      className,
      doRecut,
      tag = 'span',
      tagStyle = 'bodyMedium',
      weight,
      fontStyle,
      isScreenReaderOnly,
      ...rest
    }: TypographyProps,
    ref: any,
  ) => {
    const Tag = tag;
    const isAllowedTagStyle = RECUT_TAGSTYLES.includes(tagStyle);

    if (doRecut && typeof children === 'string' && isAllowedTagStyle) {
      // the recut font will need at least two characters to apply recut on the first word
      // we could apply recut to the first word, but that can lead to unintended line breaks
      const firstWord = children.split(' ').shift();
      const firstLetterOfFirstWord = firstWord?.split('').slice(0, 2).join('');
      const restOfFirstWord = firstWord?.split('').slice(2).join('') + ' ';
      const restWords = children.split(' ').slice(1).join(' ');
      const finalList = restOfFirstWord?.concat(restWords);

      return (
        <Tag
          {...rest}
          ref={ref}
          className={classNames(
            styles.component,
            styles.recutContainer,
            styles[tagStyle],
            fontStyle && fontStyles[fontStyle],
            weight && weights[weight],
            className,
          )}
        >
          <span className={styles.doRecut} data-testid="recut">
            {firstLetterOfFirstWord}
          </span>
          <span>{finalList}</span>
        </Tag>
      );
    }

    return (
      <Tag
        {...rest}
        ref={ref}
        className={classNames(
          doRecut && styles.doRecut,
          styles.component,
          styles[tagStyle],
          fontStyle && fontStyles[fontStyle],
          weight && weights[weight],
          className,
          {
            ['screenReaderOnly']: isScreenReaderOnly,
          },
        )}
      >
        {children}
      </Tag>
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
