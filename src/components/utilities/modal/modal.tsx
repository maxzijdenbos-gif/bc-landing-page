import classNames from 'classnames';
import { MODAL_ROOT_ID } from 'constants/index';
import {
  type JSX,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import lockBodyScroll from 'libraries/utilities/body-scroll-lock/lock-body-scroll';
import { restoreFocus } from 'libraries/utilities/focus-restoration/focus-restoration';
import { useActiveModalContext } from './context/modal-context';
import styles from './modal.module.scss';

interface ModalProps {
  ariaTitle: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  modalId: string;
  onTransitionEndCallback?: (isVisible: boolean) => void;
  triggerScrollToTop?: number | string | boolean;
}

const Modal = ({
  className,
  children,
  modalId,
  triggerScrollToTop,
}: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const { activeModal, focusThisAtClose, setActiveModal } =
    useActiveModalContext();

  const close = () => {
    setActiveModal && setActiveModal(undefined);
    lockBodyScroll(false);
    restoreFocus(focusThisAtClose ?? null);
  };

  useEffect(() => {
    if (!MODAL_ROOT_ID) return;
    queueMicrotask(() => setModalRoot(document.getElementById(MODAL_ROOT_ID)));
  }, []);

  const onOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (modalContainerRef.current === event.target) {
      close();
    }
  };

  useEffect(() => {
    const modalIsVisible = activeModal?.id === modalId;

    if (modalIsVisible) {
      lockBodyScroll(true);
    }
  }, [modalId, activeModal]);

  useEffect(() => {
    if (!modalContainerRef?.current) return;
    modalContainerRef.current.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }, [triggerScrollToTop]);

  if (!modalRoot) return <div className="screenReaderOnly">{children}</div>; // This ensures content for indexing and no layout shifts
  const isHidden = activeModal?.id !== modalId;

  return createPortal(
    <div
      ref={modalContainerRef}
      aria-hidden={isHidden ? true : undefined}
      className={classNames(styles.component, className)}
      data-show={String(activeModal?.id === modalId)}
      id={modalId}
      onClick={onOverlayClick}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && activeModal?.id === modalId) {
          close();
        }
      }}
    >
      {children}
    </div>,
    modalRoot,
  );
};

Modal.displayName = 'Modal';

export default Modal;
