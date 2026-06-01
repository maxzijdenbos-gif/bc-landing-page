import { useI18n } from 'next-localization';
import Typography from 'components/atoms/typography/typography';
import { ModuleWrapperProps } from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { ConsentCategories } from 'libraries/contexts/cookie-consent-context';
import Button from '../button/button';
import styles from './content-blocked.module.scss';

export interface ContentBlockedProps extends ModuleWrapperProps {
  missingAcceptOfCookieCategories: ConsentCategories[];
}

const ContentBlocked = ({
  missingAcceptOfCookieCategories,
  ...rest
}: ContentBlockedProps) => {
  const { t } = useI18n();

  return (
    <div className={styles.component} {...rest}>
      <Typography tag={'p'} tagStyle="bodyMedium">
        {t('cookies.contentIsBlocked', {
          missingAcceptOfCookieCategories: missingAcceptOfCookieCategories
            .map((cookieCategory) =>
              t(
                `cookies.consentCategory${cookieCategory
                  .charAt(0)
                  .toUpperCase()}${cookieCategory.slice(1)}`,
              ),
            )
            .join(', '),
        })}
      </Typography>
      <Button
        onClick={() => {
          window.CookieConsent?.renew?.();
        }}
        text={t('cookies.updateConsent')}
        variant={'Text'}
      />
    </div>
  );
};

ContentBlocked.displayName = 'ContentBlocked';

export default ContentBlocked;
