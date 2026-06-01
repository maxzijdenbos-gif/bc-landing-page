import React from 'react';
import Typography, {
  TypographyProps,
} from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import Row from 'components/utilities/row/row';
import styles from './typographic-system.module.scss';

interface Typo {
  details: string[];
  headline: string;
  tag: TypographyProps['tag'];
  tagStyle: TypographyProps['tagStyle'];
}

const typo: Typo[] = [
  {
    details: [
      'Family: OverPass',
      'Weight: Heavy',
      'Size: 80px / 56px / 40px',
      'Line Height: 100%',
    ],
    headline: 'Display XLarge',
    tag: 'h1',
    tagStyle: 'displayXLarge',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Heavy',
      'Size: 56px / 48px / 40px',
      'Line Height: 100%',
    ],
    headline: 'Display Large',
    tag: 'h1',
    tagStyle: 'displayLarge',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Heavy',
      'Size: 48px / 40px / 36px',
      'Line Height: 100%',
    ],
    headline: 'Display Medium',
    tag: 'h1',
    tagStyle: 'displayMedium',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Heavy',
      'Size: 40px / 32px / 32px',
      'Line Height: 100%',
    ],
    headline: 'Display Small',
    tag: 'h1',
    tagStyle: 'displaySmall',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Heavy | Regular',
      'Size: 28px / 28px / 28px',
      'Line Height: 100%',
    ],
    headline: 'Display XSmall',
    tag: 'h1',
    tagStyle: 'displayXSmall',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Bold | Regular',
      'Size: 24px / 24px / 22px',
      'Line Height: 114%',
    ],
    headline: 'Headline Large',
    tag: 'h1',
    tagStyle: 'headlineLarge',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Bold | Regular',
      'Size: 20px / 20px / 18px',
      'Line Height: 114%',
    ],
    headline: 'Headline Medium',
    tag: 'h2',
    tagStyle: 'headlineMedium',
  },
  {
    details: [
      'Family: OverPass',
      'Weight: Bold | SemiBold | Regular',
      'Size: 16px / 16px / 14px',
      'Line Height: 114%',
    ],
    headline: 'Headline Small',
    tag: 'h3',
    tagStyle: 'headlineSmall',
  },

  {
    details: [
      'Family: Open Sans',
      'Weight: Bold | Regular',
      'Size: 20px / 20px / 20px',
      'Line Height: 150%',
    ],
    headline: 'Body XLarge',
    tag: 'p',
    tagStyle: 'bodyXLarge',
  },
  {
    details: [
      'Family: Open Sans',
      'Weight: Bold | SemiBold | Regular',
      'Size: 16px / 16px / 16px',
      'Line Height: 150%',
    ],
    headline: 'Body Large',
    tag: 'p',
    tagStyle: 'bodyLarge',
  },
  {
    details: [
      'Family: Open Sans',
      'Weight: Bold | Regular',
      'Size: 14px / 14px / 14px',
      'Line Height: 150%',
    ],
    headline: 'Body Medium',
    tag: 'p',
    tagStyle: 'bodyMedium',
  },
  {
    details: [
      'Family: Open Sans',
      'Weight: Bold | Regular',
      'Size: 12px / 12px / 12px',
      'Line Height: 150%',
    ],
    headline: 'Body Small',
    tag: 'p',
    tagStyle: 'bodySmall',
  },
  {
    details: [
      'Family: Open Sans',
      'Weight: Bold | Regular',
      'Size: 10px / 10px / 10px',
      'Line Height: 150%',
    ],
    headline: 'Body XSmall',
    tag: 'small',
    tagStyle: 'bodyXSmall',
  },
  {
    details: [
      'Family: Open Sans',
      'Weight:Bold | Regular',
      'Size: 14px / 14px / 14px',
      'Style: normal | italic',
      'Line Height: 150%',
    ],
    headline: 'Action Large',
    tag: 'small',
    tagStyle: 'actionLarge',
  },
  {
    details: [
      'Family: Open Sans',
      'Weight: Bold | Regular',
      'Size: 14px / 14px / 14px',
      'Line Height: 150%',
    ],
    headline: 'Action Medium',
    tag: 'small',
    tagStyle: 'actionMedium',
  },
];

const TypographicSystem = () => {
  const renderRow = (
    { details, headline, tag, tagStyle }: Typo,
    typeIndex: number,
  ) => {
    return (
      <Row key={typeIndex} className={styles.row}>
        <Column width={{ laptop: 1 }}>
          <Typography tagStyle="bodySmall">{tagStyle}</Typography>
        </Column>

        <Column className={styles.detailsColumn} width={{ laptop: 2 }}>
          <Typography tagStyle="bodySmall">
            {details.map((detail, detailIndex) => (
              <React.Fragment key={detailIndex}>
                {detail}

                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Column>

        <Column width={{ laptop: 9 }}>
          <Typography tag={tag} tagStyle={tagStyle}>
            {headline}
          </Typography>
        </Column>
      </Row>
    );
  };

  return (
    <section className={styles.component}>
      <Container className={styles.container} fullWidth>
        {typo.map((type, typeIndex) => {
          return renderRow(type, typeIndex);
        })}
      </Container>
    </section>
  );
};

TypographicSystem.displayName = 'TypographicSystem';

export default TypographicSystem;
