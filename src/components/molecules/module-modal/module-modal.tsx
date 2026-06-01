import { useEffect, useRef } from 'react';
import { ModuleWrapperProps } from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import ContentModal from 'components/utilities/modal/content-modal/content-modal';
import { useActiveModalContext } from 'components/utilities/modal/context/modal-context';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import {
  getPopUpModalLastTrigger,
  trackPopUpModal,
} from 'integrations/tracking/google-tag-manager/scripts';
import ModuleModalContent from './module-modal-content/module-modal-content';

export interface SingleTabContentProps {
  /** The Amplience image object to construct image from */
  imageObject?: AmplienceImagePayload;
  /** The tab headline */
  tabHeadline?: string;
  /** The tab richtext */
  tabText?: string;
  /** The title of the tag used for tab link */
  tabTitle: string;
}
export interface ModuleModalProps extends ModuleWrapperProps {
  modalId: string;
  /** The title of the modal */
  modalTitle?: string;
  /** List of tabs and their content */
  tabs?: SingleTabContentProps[];
}

const ModuleModal = ({
  tabs,
  modalTitle,
  modalId,
  color,
}: ModuleModalProps) => {
  const { activeModal } = useActiveModalContext();
  const reportedOpening = useRef(false);

  const modalIsVisible = activeModal?.id === modalId;

  // Using the in-memory stored modal trigger (the link text for the trigger button) we can report when the modal is opened with the correct click_text
  useEffect(() => {
    if (!reportedOpening.current && modalIsVisible) {
      reportedOpening.current = true;
      trackPopUpModal({
        action: 'open',
        clickText: getPopUpModalLastTrigger(),
        title: modalTitle,
      });
    } else {
      reportedOpening.current = false;
    }
  }, [modalTitle, modalIsVisible]);

  return (
    <ContentModal ariaTitle={modalTitle ?? ''} color={color} modalId={modalId}>
      <ModuleModalContent
        modalIsVisible={modalIsVisible}
        modalTitle={modalTitle}
        tabs={tabs}
      />
    </ContentModal>
  );
};

ModuleModal.displayName = 'ModuleModal';

export default ModuleModal;
