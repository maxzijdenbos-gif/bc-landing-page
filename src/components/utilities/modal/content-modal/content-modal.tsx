import { useI18n } from 'next-localization';
import { type JSX, MouseEventHandler, useRef } from 'react';
import Icon from 'components/atoms/icon/icon';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Row from 'components/utilities/row/row';
import lockBodyScroll from 'libraries/utilities/body-scroll-lock/lock-body-scroll';
import { restoreFocus } from 'libraries/utilities/focus-restoration/focus-restoration';
import FocusTrap from '../../focus-trap/focus-trap';
import { useActiveModalContext } from '../context/modal-context';
import Modal from '../modal';
import styles from './content-modal.module.scss';

interface ModalProps extends ModuleWrapperProps {
  ariaTitle: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  modalId: string;
  onInternalClose?: () => void;
  onTransitionEndCallback?: (isVisible: boolean) => void;
  resetFocusTrap?: number | string | boolean;
  triggerScrollToTop?: number | string | boolean;
}

const ContentModal = ({
  ariaTitle,
  children,
  color,
  modalId,
  onTransitionEndCallback,
  resetFocusTrap,
  triggerScrollToTop,
}: ModalProps) => {
  const { t } = useI18n();

  const modalContentWrapperRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { activeModal, setActiveModal, focusThisAtClose } =
    useActiveModalContext();

  const close = () => {
    setActiveModal && setActiveModal(undefined);
    lockBodyScroll(false);
    restoreFocus(focusThisAtClose ?? null);
  };

  const onOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target as HTMLElement) // Matches the element we listen on
    ) {
      close();
    }
  };

  const isHidden = activeModal?.id !== modalId;

  return (
    <Modal
      ariaTitle={ariaTitle}
      className={styles.modalAnimation}
      modalId={modalId}
      triggerScrollToTop={triggerScrollToTop}
    >
      <FocusTrap
        focusAreaRef={modalContentWrapperRef}
        focusThisRefOnReset={closeButtonRef}
        resetEventsValue={[resetFocusTrap]}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          ref={modalContentWrapperRef}
          className={styles.component}
          onClick={onOverlayClick}
          onTransitionEnd={(e) => {
            if (
              e.target === modalContentWrapperRef.current &&
              e.propertyName === 'top'
            ) {
              modalContainerRef.current?.scrollTo(0, 0);
              onTransitionEndCallback &&
                onTransitionEndCallback(modalId === activeModal?.id);
            }
          }}
        >
          <Container>
            <Row outerGutter={{ tablet: 'medium' }}>
              <Column offset={{ laptop: 1 }} width={{ laptop: 10 }}>
                <div
                  ref={modalContentRef}
                  inert={isHidden ? true : undefined}
                  aria-label={!isHidden ? ariaTitle : undefined}
                  aria-modal={!isHidden ? true : undefined}
                  role="dialog"
                >
                  <ModuleWrapper className={styles.modalContent} color={color}>
                    <div className={styles.iconWrapper}>
                      <button
                        ref={closeButtonRef}
                        aria-label={t('modal.closeModal')}
                        className={styles.closeIcon}
                        onClick={close}
                      >
                        <Icon name="Close_24" hidden />
                      </button>
                    </div>
                    {children}
                  </ModuleWrapper>
                </div>
              </Column>
            </Row>
          </Container>
        </div>
      </FocusTrap>
    </Modal>
  );
};

ContentModal.displayName = 'ContentModal';

export default ContentModal;
