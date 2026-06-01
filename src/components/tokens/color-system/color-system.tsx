import classNames from 'classnames';
import Typography from 'components/atoms/typography/typography';
import Column, { ColumnsType } from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import Row from 'components/utilities/row/row';
import styles from './color-system.module.scss';

const ColorSystem = () => {
  const colors: {
    class: string;
    columns: ColumnsType;
    title: string;
  }[] = [
    { class: 'primary', columns: 3, title: 'primary' },
    { class: 'secondary', columns: 3, title: 'secondary' },
    { class: 'tertiary', columns: 3, title: 'tertiary' },
    { class: 'quaternary', columns: 3, title: 'quaternary' },
    { class: 'quinary', columns: 3, title: 'quinary' },
  ];

  return (
    <div className={styles.component}>
      <Container className={styles.container} fullWidth>
        <Row className={styles.row}>
          {colors.map((color, colorIndex) => (
            <Column
              key={colorIndex}
              className={styles.column}
              width={{ tablet: color.columns }}
            >
              <div
                className={classNames(
                  styles.color,
                  styles[`color--${color.class}`],
                )}
              >
                <div className={styles.headline}>
                  <Typography tag="p" tagStyle="displayXSmall" weight="heavy">
                    {color.title}
                  </Typography>
                </div>

                <div className={styles.info}>
                  <div>
                    <Typography
                      className={styles.baseColor}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      color
                    </Typography>
                  </div>
                  <div>
                    <Typography className={styles.cta} tag="p" weight="bold">
                      <span className={styles.colorBall} />
                      cta
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.ctaVariant}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      cta Variant
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.ctaContrast}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      cta Contrast
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.ctaContrastVariant}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      cta Contrast Variant
                    </Typography>
                  </div>
                  <div>
                    <Typography className={styles.accent} tag="p" weight="bold">
                      <span className={styles.colorBall} />
                      accent
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.accentVariant}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      accent Variant
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.contrast}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      contrast
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.contrastVariant}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      contrast Variant
                    </Typography>
                  </div>
                  <div>
                    <Typography className={styles.tint} tag="p" weight="bold">
                      <span className={styles.colorBall} />
                      tint
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.tintVariant}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      tint Variant
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={styles.tintContrast}
                      tag="p"
                      weight="bold"
                    >
                      <span className={styles.colorBall} />
                      tint Contrast
                    </Typography>
                  </div>
                  <div>
                    <Typography className={styles.tone} tag="p" weight="bold">
                      <span className={styles.colorBall} />
                      tone
                    </Typography>
                  </div>
                  <div>
                    <Typography className={styles.alert} tag="p" weight="bold">
                      <span className={styles.colorBall} />
                      alert
                    </Typography>
                  </div>
                </div>
              </div>
            </Column>
          ))}
        </Row>
      </Container>
    </div>
  );
};

ColorSystem.displayName = 'ColorSystem';

export default ColorSystem;
