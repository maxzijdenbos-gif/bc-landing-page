import Column from 'components/utilities/column/column';
import Row from 'components/utilities/row/row';
import styles from './grid-system.module.scss';

const GridSystem = () => {
  return (
    <section className={styles.component}>
      <Row className={styles.row}>
        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>

        <Column width={{ laptop: 1, mobile: 6, tablet: 3 }}>
          <div className={styles.grid} />
        </Column>
      </Row>
    </section>
  );
};

GridSystem.displayName = 'GridSystem';

export default GridSystem;
