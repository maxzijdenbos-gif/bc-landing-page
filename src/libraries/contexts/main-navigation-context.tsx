// main-navigation-context.tsx
import React, { createContext, useContext, useState } from 'react';

interface MainNavigationContextType {
  isNavigationHidden: boolean;
  preventHideNavigation: boolean;
  setIsNavigationHidden: (value: boolean) => void;
  setPreventHideNavigation: (value: boolean) => void;
}

const MainNavigationContext = createContext<MainNavigationContextType>({
  isNavigationHidden: false,
  preventHideNavigation: false,
  setIsNavigationHidden: () => undefined,
  setPreventHideNavigation: () => undefined,
});

export function useMainNavigationContext() {
  return useContext(MainNavigationContext);
}

export const MainNavigationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNavigationHidden, setIsNavigationHidden] = useState(false);
  const [preventHideNavigation, setPreventHideNavigation] = useState(false);

  return (
    <MainNavigationContext.Provider
      value={{
        isNavigationHidden,
        preventHideNavigation,
        setIsNavigationHidden,
        setPreventHideNavigation,
      }}
    >
      {children}
    </MainNavigationContext.Provider>
  );
};

export default MainNavigationContext;
