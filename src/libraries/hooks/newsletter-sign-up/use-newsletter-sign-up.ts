import { useMutation } from '@tanstack/react-query';
import { subscribeUserToNewsletter } from 'integrations/klaviyo/subscriptions/subscribe-newsletter/subscribe-newsletter';
import { NewsletterSignupForm } from 'integrations/klaviyo/subscriptions/subscribe-newsletter/subscribe-newsletter.types';

export const useNewsletterSignup = () => {
  return useMutation({
    mutationFn: (formData: NewsletterSignupForm) =>
      subscribeUserToNewsletter(formData),
    mutationKey: ['newsLetterSignup'],
  });
};
