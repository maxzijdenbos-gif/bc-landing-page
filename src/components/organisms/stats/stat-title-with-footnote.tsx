import React from 'react';
import Typography from 'components/atoms/typography/typography';

export interface StatTitleWithFootnoteProps {
  footnoteId: string;
  legalText: string;
  noteId: string;
  onFootnoteClick: (e: React.MouseEvent) => void;
  statsTitle?: string;
  styles: Readonly<Record<string, string>>;
}

const StatTitleWithFootnote = ({
  footnoteId,
  legalText,
  noteId,
  onFootnoteClick,
  statsTitle,
  styles,
}: StatTitleWithFootnoteProps) => {
  const showFootnote = statsTitle?.includes('*') && legalText;

  if (!showFootnote) {
    return (
      <Typography className={styles.statTitle} tag="p" tagStyle="bodyMedium">
        {statsTitle}
      </Typography>
    );
  }

  const title = statsTitle ?? '';
  const starIdx = title.indexOf('*');
  const beforeStar = title.slice(0, starIdx);
  const afterStar = title.slice(starIdx + 1);

  return (
    <Typography className={styles.statTitle} tag="p" tagStyle="bodyMedium">
      {beforeStar}
      <sup id={footnoteId}>
        <a
          aria-describedby={noteId}
          className={styles.statTitleLink}
          href={`#${noteId}`}
          onClick={onFootnoteClick}
        >
          *
        </a>
      </sup>
      {afterStar}
    </Typography>
  );
};

export default StatTitleWithFootnote;
