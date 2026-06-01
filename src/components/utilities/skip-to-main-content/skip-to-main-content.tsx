import Typography from 'components/atoms/typography/typography';
import styles from './skip-to-main-content.module.scss';

export type SkipToMainContentProps = {
  mainContentId: string;
  skipLinkText?: string;
};

const SkipToMainContent = ({
  mainContentId,
  skipLinkText,
}: SkipToMainContentProps) => {
  if (!skipLinkText && mainContentId) return null;

  return (
    <div className={styles.component} id="skip">
      <a href={`#${mainContentId}`}>
        <Typography tagStyle="actionMedium">{skipLinkText}</Typography>
      </a>
    </div>
  );
};

SkipToMainContent.displayName = 'SkipToMainContent';

export default SkipToMainContent;
