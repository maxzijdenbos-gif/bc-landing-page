import React, { useId } from 'react';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Link from 'components/utilities/link/link';
import styles from './footer.module.scss';

export interface FooterColumnProps {
  col: { header: string; links: BaseLink[] };
  onLinkClick: (args: { clickText: string; title: string }) => void;
}

const FooterColumn = React.memo(({ col, onLinkClick }: FooterColumnProps) => {
  const headingId = useId();

  return (
    <Column className={styles.section} width={{ tablet: 3 }}>
      <Typography
        className={styles.header}
        id={headingId}
        tag="h2"
        tagStyle="headlineMedium"
        weight="bold"
      >
        {col.header}
      </Typography>
      <ul aria-labelledby={headingId} className={styles.linksList}>
        {col.links?.map((colLink) => (
          <li key={`${col.header}-${colLink?.linkText}`}>
            <Link
              className={styles.link}
              link={colLink}
              onClick={() =>
                onLinkClick({
                  clickText: colLink?.linkText ?? '',
                  title: col?.header,
                })
              }
              target={colLink?.target}
            >
              {colLink?.linkText}
            </Link>
          </li>
        ))}
      </ul>
    </Column>
  );
});
FooterColumn.displayName = 'FooterColumn';

export default FooterColumn;
