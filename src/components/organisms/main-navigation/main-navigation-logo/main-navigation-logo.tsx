import { useI18n } from 'next-localization';
import * as Logos from 'assets/logos/logos';
import styles from './main-navigation-logo.module.scss';

const DEFAULT_LOGO_HEIGHT = 28;

const theme = process.env.NEXT_PUBLIC_THEME_NAME as Theme;
// Needs to do the following because safari does not respect 100% width in svg
const svgWidth: Record<Theme, number> = {
  giant: 148,
  liv: 42,
};

type Props = {
  ariaHidden: boolean;
};

const MainNavigationLogo = ({ ariaHidden = false }: Props) => {
  const { t } = useI18n();
  const LogoComponent = Logos[theme];

  if (!LogoComponent) {
    return null;
  }

  return (
    <div className={styles.component}>
      <LogoComponent
        {...(!ariaHidden ? { 'aria-label': t('navigation.logo') } : {})}
        aria-hidden={ariaHidden}
        className={styles.logo}
        height={DEFAULT_LOGO_HEIGHT}
        width={svgWidth[theme]}
      />
    </div>
  );
};

export default MainNavigationLogo;
