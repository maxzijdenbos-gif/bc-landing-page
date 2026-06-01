import { useContext, useState } from 'react';
import ActiveModalContext, {
  ActiveModalData,
} from 'libraries/contexts/active-modal';

export const useActiveModalContext = () => {
  return useContext(ActiveModalContext);
};

export const ActiveModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeModal, setActiveModal] = useState<ActiveModalData | undefined>(
    undefined,
  );
  const [focusThisAtClose, setFocusThisAtClose] = useState<HTMLElement | null>(
    null,
  );

  return (
    <ActiveModalContext.Provider
      value={{
        activeModal,
        focusThisAtClose,
        setActiveModal,
        setFocusThisAtClose,
      }}
    >
      {children}
    </ActiveModalContext.Provider>
  );
};
