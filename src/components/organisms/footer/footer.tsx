/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, { useRef } from 'react';
import Icon from 'components/atoms/icon/icon';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import Link from 'components/utilities/link/link';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import Row from 'components/utilities/row/row';
import {
  AmplienceImagePayload,
  ContentMeta,
  IconLink,
} from 'integrations/content/amplience/types/content-types';
import {
  trackFooterClick,
  trackSocialChannel,
} from 'integrations/tracking/google-tag-manager/scripts';
import useIntersectionObserver from 'libraries/hooks/dom/use-intersection-observer';
import FooterColumn from './footer-column';
import styles from './footer.module.scss';

export interface FooterProps {
  _meta: ContentMeta;
  brandImage: {
    _meta: ContentMeta;
    imageObject: AmplienceImagePayload;
  };
  copyrightText: string;
  languageLink: {
    iconClass: IconName;
    link: BaseLink[];
    selectedLanguage: string;
  };
  linkColumns: {
    header: string;
    links: BaseLink[];
  }[];
  socialMediaLinks: IconLink[];
}

const Footer = ({
  linkColumns,
  languageLink,
  socialMediaLinks,
  copyrightText,
  brandImage,
}: FooterProps) => {
  const { t } = useI18n();
  const footerRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear().toString();
  const copyrightTextWithCurrentYear = copyrightText
    ? copyrightText.replace('{{year}}', currentYear)
    : '';

  const { domNode: brandLogo, isViewed: brandLogoIsViewed } =
    useIntersectionObserver({ threshold: 0.8 });

  if (!linkColumns && !languageLink && !socialMediaLinks && !brandImage) {
    return null;
  }

  const handleChildFocused = (event: React.FocusEvent<HTMLElement>) => {
    if (event.relatedTarget) {
      // check if the event has a related target as this indicates that the focus has been created by tabbing
      window.scrollTo({
        top: document.body.scrollHeight,
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className={styles.component}
      onFocus={handleChildFocused}
    >
      <Container>
        <section className={styles.footerMainLinks}>
          <Row className={styles.row} outerGutter={{ mobile: 'medium' }}>
            {linkColumns?.map((col) => (
              <FooterColumn
                key={col.header}
                col={col}
                onLinkClick={trackFooterClick}
              />
            ))}
          </Row>
        </section>

        <Row className={styles.iconRow} outerGutter={{ mobile: 'medium' }}>
          <Column
            className={classNames(
              styles.brandImageWrapper,
              styles.aboveTabletOnly,
            )}
            width={{ smallLaptop: 8, tablet: 7 }}
          >
            <MotionSlide direction="left-right" initMotion={brandLogoIsViewed}>
              <Image
                ref={brandLogo}
                alt=""
                className={styles.giantImage}
                height={111}
                imageObject={brandImage?.imageObject}
                width={878}
              />
            </MotionSlide>
          </Column>
          {languageLink && (
            <Column width={{ smallLaptop: 4, tablet: 5 }}>
              <div className={styles.iconLinks}>
                <div className={styles.socialLinks}>
                  <Link
                    aria-label={languageLink.link?.[0]?.linkText}
                    className={styles.languageLink}
                    link={languageLink.link?.[0]}
                    target={languageLink.link?.[0]?.target}
                  >
                    <Icon hidden name={languageLink.iconClass} />
                    <span className={styles.link}>
                      {languageLink.selectedLanguage}
                    </span>
                  </Link>
                  <span className={styles.socialLinkSeparator} />
                  <ul className={styles.socialMediaIcons}>
                    {socialMediaLinks?.map((socialLink, index) => {
                      return (
                        <li key={`social-link-${index}`}>
                          <Link
                            aria-label={
                              socialLink.link?.[0]?.linkText ??
                              t('global.socialMediaLink')
                            }
                            className={styles.socialLink}
                            link={socialLink.link?.[0]}
                            target={socialLink.link?.[0]?.target}
                            title={socialLink.link?.[0]?.linkText}
                            trackOnClick={(socialNetwork) =>
                              trackSocialChannel({ socialNetwork })
                            }
                          >
                            <Icon name={socialLink.iconClass} hidden />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Typography
                  className={styles.copyrightText}
                  tag="span"
                  tagStyle="bodySmall"
                >
                  {copyrightTextWithCurrentYear}
                </Typography>
              </div>
            </Column>
          )}
        </Row>

        {brandImage && (
          <Image
            alt=""
            className={classNames(styles.giantImage, styles.belowTabletOnly)}
            height={111}
            imageObject={brandImage.imageObject}
            width={878}
          />
        )}
      </Container>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
