import Typography from 'components/atoms/typography/typography';
import styles from './newsletter-sign-up-success.module.scss';

export interface NewsletterSignUpSuccessProps {
  headline: string;
  text: string;
}

const NewsletterSignUpSuccess = ({
  headline,
  text,
}: NewsletterSignUpSuccessProps) => {
  return (
    <div className={styles.component} role="status">
      <Typography tag="h2" tagStyle="displayLarge">
        {headline}
      </Typography>
      <Typography tag="p">{text}</Typography>
    </div>
  );
};

NewsletterSignUpSuccess.displayName = 'NewsletterSignUpSuccess';

export default NewsletterSignUpSuccess;
