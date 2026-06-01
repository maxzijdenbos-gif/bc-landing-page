import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import React, { useEffect, useId, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkbox from 'components/atoms/checkbox/checkbox';
import Loader from 'components/atoms/loader/loader';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Form from 'components/utilities/form/form';
import Link from 'components/utilities/link/link';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import Row from 'components/utilities/row/row';
import { NewsletterSignupForm } from 'integrations/klaviyo/subscriptions/subscribe-newsletter/subscribe-newsletter.types';
import {
  trackCustomError,
  trackSubscribeEdm,
} from 'integrations/tracking/google-tag-manager/scripts';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import { useNewsletterSignup } from 'libraries/hooks/newsletter-sign-up/use-newsletter-sign-up';
import Button from '../button/button';
import Input from '../input/input';
import NewsletterSignUpSuccess from './newsletter-sign-up-success/newsletter-sign-up-success';
import styles from './newsletter-sign-up.module.scss';

export interface NewsletterSignUpProps extends ModuleWrapperProps {
  buttonText: string;
  formType?: string;
  headline: string;
  successHeadline: string;
  successText: string;
  text?: string;
}

const MINIMUM_TIME_LOADING = 1000;

const NewsletterSignUp = ({
  anchorTarget,
  buttonText,
  formType,
  headline,
  successHeadline,
  successText,
  text,
  ...rest
}: NewsletterSignUpProps) => {
  const formId = useId();
  const emailInputId = useId();
  const {
    mutate: newsletterSignup,
    isSuccess,
    isError,
    isPending,
  } = useNewsletterSignup();
  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);
  const [isMinimumTimePassed, setIsMinimumTimePassed] = useState(true);
  const { t } = useI18n();
  const { domNode, isViewed } = useIntersectionObserver({ threshold: 0.2 });
  const sentSuccessEvent = useRef(false);
  const didReportFormstateErrors = useRef(false);
  const didReportNewsletterSuccess = useRef(false);
  const didReportNewsletterFailure = useRef(false);

  const {
    formState: { errors, isDirty, isValid },
    register,
    handleSubmit,
  } = useForm<NewsletterSignupForm>({
    defaultValues: {
      cultureCode: locale,
      'email-consent': false,
      email_address: '',
    },
    mode: 'onSubmit',
  });

  const [inputHasHadFocus, setInputHasHadFocus] = useState(false);

  const onSubmit: SubmitHandler<NewsletterSignupForm> = async (data) => {
    setIsMinimumTimePassed(false);
    didReportFormstateErrors.current = false;
    didReportNewsletterSuccess.current = false;
    didReportNewsletterFailure.current = false;

    try {
      newsletterSignup(data);
    } catch (error) {
      // Nothing to handle here
    }
  };

  useEffect(() => {
    if (!isMinimumTimePassed) {
      setTimeout(() => {
        setIsMinimumTimePassed(true);
      }, MINIMUM_TIME_LOADING);
    }
  }, [isMinimumTimePassed]);

  useEffect(() => {
    const errorEntries = Object.entries(errors);
    if (!errorEntries.length || didReportFormstateErrors.current) return;
    didReportFormstateErrors.current = true;
    errorEntries.forEach(([fieldName, data]) => {
      trackCustomError({
        errorMessage: data.message,
        errorType: `Newsletter: ${formType}, Field: ${fieldName}.`,
      });
    });
  }, [errors, formType]);

  useEffect(() => {
    if (
      !isMinimumTimePassed ||
      !isSuccess ||
      didReportNewsletterSuccess.current
    )
      return;
    didReportNewsletterSuccess.current = true;
    trackSubscribeEdm({ formType });
  }, [formType, isMinimumTimePassed, isSuccess]);

  useEffect(() => {
    if (!isMinimumTimePassed || !isError || didReportNewsletterFailure.current)
      return;
    didReportNewsletterFailure.current = true;
    trackCustomError({
      errorMessage: t('formErrors.generalNewsLetterError'),
      errorType: `Newsletter: ${formType}`,
    });
  }, [formType, isError, isMinimumTimePassed, t]);

  useEffect(() => {
    if (isSuccess && isMinimumTimePassed && !sentSuccessEvent.current) {
      sentSuccessEvent.current = true;
    }
  }, [isMinimumTimePassed, isSuccess]);

  if (isSuccess && isMinimumTimePassed) {
    return (
      <ModuleWrapper {...rest} className={styles.component}>
        <Row>
          <Column
            className={styles.container}
            offset={{ smallLaptop: 3, tablet: 2 }}
            width={{ smallLaptop: 6, tablet: 10 }}
          >
            <NewsletterSignUpSuccess
              headline={successHeadline}
              text={successText}
            />
          </Column>
        </Row>
      </ModuleWrapper>
    );
  }

  return (
    <ModuleWrapper
      {...rest}
      ref={domNode}
      anchorTarget={anchorTarget}
      className={styles.component}
    >
      <MotionSlide
        className={styles.motionWrapper}
        direction="up"
        initMotion={isViewed}
        speed="speed-slow"
      >
        <Row outerGutter={{ mobile: 'medium' }}>
          <Column
            className={styles.container}
            offset={{ smallLaptop: 3, tablet: 2 }}
            width={{ smallLaptop: 6, tablet: 8 }}
          >
            <div className={styles.text}>
              <Typography
                className={styles.component}
                tag="h2"
                tagStyle="displayLarge"
              >
                {headline}
              </Typography>
              <Typography className={styles.component} tag="p">
                {text}
              </Typography>
            </div>
          </Column>
        </Row>
        <Row outerGutter={{ mobile: 'medium' }}>
          <Column
            className={styles.container}
            offset={{ smallLaptop: 4, tablet: 2 }}
            width={{ smallLaptop: 4, tablet: 8 }}
          >
            <Form
              className={styles.form}
              id={formId}
              isDirty={isDirty}
              isValid={isValid}
              noValidate // Disable browser validation - because we want to show custom validation messages
              // handleSubmit captures submit handler; react-hooks/refs false positive (refs only used in submit path)
              // eslint-disable-next-line react-hooks/refs -- rhf handleSubmit + onSubmit
              onSubmit={handleSubmit(onSubmit, () => {})}
            >
              <div className={styles.inputContainer}>
                <Input
                  {...register('email_address', {
                    pattern: {
                      message: t('formErrors.emailError'),
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    },
                    required: t('forms.required'),
                  })}
                  autoComplete="email"
                  className={styles.input}
                  error={errors.email_address?.message}
                  id={emailInputId}
                  label={t('forms.email')}
                  onFocus={() => {
                    setInputHasHadFocus(true);
                  }}
                  required
                  type="email"
                />
                <div
                  className={classNames(styles.checkboxContainer, {
                    [styles.isActive]: inputHasHadFocus, // the touchedFields object in formState can not be used as it will only be set to true when the field is blurred and not on focus
                  })}
                >
                  <Checkbox
                    aria-label={`${t('legal.legalNewsletterText')} ${t('legal.legalNewsletterTextLink')}`}
                    className={styles.checkbox}
                    {...register('email-consent', {
                      required: t('forms.requiredConsent'),
                    })}
                    error={errors['email-consent']?.message}
                    tabIndex={inputHasHadFocus ? 0 : -1}
                  >
                    <Typography
                      className={styles.legalText}
                      data-testid="newsletter-sign-up-legal-text"
                      tag="span"
                      tagStyle="bodyXSmall"
                    >
                      {t('legal.legalNewsletterText')}{' '}
                      <Link
                        link={{ externalLink: t('legal.legalNewsletterLink') }}
                        aria-label={t('legal.legalNewsletterTextLinkAriaLabel')}
                      >
                        {t('legal.legalNewsletterTextLink')}
                      </Link>
                    </Typography>
                  </Checkbox>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button text={buttonText} />
                  {isError && (
                    <Typography
                      className={styles.error}
                      tagStyle="bodyXSmall"
                      weight="bold"
                    >
                      {t('formErrors.generalNewsLetterError')}
                    </Typography>
                  )}
                </div>
              </div>
            </Form>
          </Column>
        </Row>
      </MotionSlide>
      {(isPending || !isMinimumTimePassed) && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}
    </ModuleWrapper>
  );
};

NewsletterSignUp.displayName = 'NewsletterSignUp';

export default NewsletterSignUp;
