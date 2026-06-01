export interface NewsletterSignupForm {
  cultureCode: string;
  'email-consent': boolean;
  email_address: string;
}

export interface NewsLetterSignUpError {
  code: 'duplicate_profile';
}

export interface NewsLetterSignUpResponse {
  data: {
    id: string;
    type: 'profile';
  };
}
