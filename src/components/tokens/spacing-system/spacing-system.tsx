import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import Row from 'components/utilities/row/row';
import styles from './spacing-system.module.scss';

const SpacingSystem = () => {
  const spacings = [
    { label: '4px', title: 'XXS' },
    { label: '8px', title: 'XS' },
    { label: '12px', title: 'S' },
    { label: '16px', title: 'SM' },
    { label: '24px', title: 'M' },
    { label: '32px', title: 'ML' },
    { label: '48px', title: 'L' },
    { label: '64px', title: 'XL' },
    { label: '96px', title: 'XXL' },
  ];

  return (
    <section className={styles.component}>
      <Container className={styles.container} fullWidth>
        <Row className={styles.row}>
          {spacings.map((spacing, spacingIndex) => (
            <Column key={spacingIndex} width={{ tablet: 1 }}>
              <div className={styles.spacing}>
                <Typography className={styles.label} tag="small">
                  {spacing.title}
                </Typography>

                <div className={styles.indicator} data-title={spacing.title} />

                <Typography tag="label">{spacing.label}</Typography>
              </div>
            </Column>
          ))}
        </Row>
      </Container>
    </section>
  );
};

SpacingSystem.displayName = 'SpacingSystem';

export default SpacingSystem;
