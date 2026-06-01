import { NewsletterSignUpProps } from './newsletter-sign-up';

const defaultStub: NewsletterSignUpProps = {
  buttonText: 'Sign up',
  headline: 'Sign up for our newsletter',
  successHeadline: 'Thank you for signing up!',
  successText: 'You will receive a confirmation email shortly.',
  text: 'Sign up for newsletter',
};

export default <Record<string, NewsletterSignUpProps>>{
  default: defaultStub,
};
