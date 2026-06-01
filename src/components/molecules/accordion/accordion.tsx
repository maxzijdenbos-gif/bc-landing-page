import classNames from 'classnames';
import { useI18n } from 'next-localization';
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import Icon from 'components/atoms/icon/icon';
import Typography from 'components/atoms/typography/typography';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { trackAccordionExpansion } from 'integrations/tracking/google-tag-manager/scripts';
import { getAllPotentiallyTabbableElements } from 'libraries/utilities/accessibility/get-all-potentially-tabbable-elements';
import styles from './accordion.module.scss';

export interface AccordionItemProps {
  accordionTrackingTitle?: string;
  children: ReactNode;
  disableToggle?: boolean;
  id?: string;
  imageObject?: AmplienceImagePayload;
  isActive?: boolean;
  onToggle?: () => void;
  title?: string;
}

export interface AccordionProps {
  accordionTrackingTitle?: string; // Used for tracking purposes. Add visual title in children prop.
  children:
    | ReactElement<AccordionItemProps>[]
    | ReactElement<AccordionItemProps>;
}

const AccordionItem = ({
  accordionTrackingTitle,
  disableToggle,
  id: idProp,
  children,
  isActive,
  onToggle,
  title,
}: AccordionItemProps) => {
  const { t } = useI18n();
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const willDisableToggle = typeof disableToggle !== 'undefined';
  const ariaLabel = isActive
    ? `${t('accordion.collapse')} ${title}`
    : `${t('accordion.expand')} ${title}`;

  const handleOnToggle = useCallback(() => {
    if (!isActive) {
      trackAccordionExpansion({
        clickText: title,
        title: accordionTrackingTitle,
      });
    }

    onToggle?.();
  }, [isActive, title, accordionTrackingTitle, onToggle]);

  // start handle tabindex for tabbable element
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabbableElements = getAllPotentiallyTabbableElements(
      contentWrapperRef.current,
    );

    tabbableElements?.forEach((element) => {
      element.tabIndex = isActive ? 0 : -1;
    });
  }, [isActive]);
  // end handle tabindex for tabbable element

  return (
    /* this rule is disabled as keyboard events are handled by the button inside of the div triggering the a11y error */
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
    <div
      className={classNames(
        styles.item,
        isActive && styles.isActive,
        disableToggle && styles.isDisabled,
        willDisableToggle && styles.willDisableToggle,
      )}
      onClick={!disableToggle && !isActive ? () => handleOnToggle() : undefined} // implement click event here to enable toggle on in entire area when not active
    >
      <Typography className={styles.itemHeadline} tag={'h3'}>
        <button
          aria-controls={`${id}-panel`}
          aria-expanded={isActive}
          aria-label={ariaLabel}
          className={styles.itemTitle}
          id={`${id}-heading`}
          onClick={
            !disableToggle && isActive ? () => handleOnToggle() : undefined
          } // disable click event for inactive items as this is handled by parent
        >
          <Typography tagStyle="bodyLarge" weight="bold">
            {title}
          </Typography>
          <Icon className={styles.close} name="Close_24" hidden />
        </button>
      </Typography>
      <div
        ref={contentWrapperRef}
        aria-hidden={!isActive}
        className={styles.expander}
        id={`${id}-panel`}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const Accordion = ({ children }: AccordionProps) => {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child) || child.type !== AccordionItem) {
      throw new Error('Only AccordionItem components are permitted.');
    }
  });

  return (
    <div className={classNames(styles.component)} role="presentation">
      {children}
    </div>
  );
};

Accordion.displayName = 'Accordion';
Accordion.AccordionItem = AccordionItem;

export default Accordion;
