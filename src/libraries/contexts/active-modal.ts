import { createContext } from 'react';

export interface ActiveModalData {
  id: string;
  title?: string;
}

interface ActiveModalProps {
  activeModal?: ActiveModalData;
  focusThisAtClose?: HTMLElement | null;
  setActiveModal?: (value: ActiveModalData | undefined) => void;
  setFocusThisAtClose?: (value: HTMLElement | null) => void;
}

const ActiveModalContext = createContext<ActiveModalProps>({
  activeModal: undefined,
  focusThisAtClose: undefined,
  setActiveModal: undefined,
  setFocusThisAtClose: undefined,
});

export default ActiveModalContext;
