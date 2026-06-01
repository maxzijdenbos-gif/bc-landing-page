import {
  createContext,
  Dispatch,
  type JSX,
  SetStateAction,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';

type TabContextProps = {
  activeTab?: number;
  id?: string;
  setActiveTab?: Dispatch<SetStateAction<number>>;
  showFirstTab: () => void;
  showLastTab: () => void;
  showNextTab: () => void;
  showPreviousTab: () => void;
};

const TabContext = createContext<TabContextProps>({
  showFirstTab: () => undefined,
  showLastTab: () => undefined,
  showNextTab: () => undefined,
  showPreviousTab: () => undefined,
});

export function useTabContext() {
  const context = useContext(TabContext);

  if (context === null) {
    throw new Error(
      `Tab content and tab navigation components cannot be rendered outside of the Tab component`,
    );
  }

  return context;
}
export interface TabsProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
  className?: string;
  onTabChangeCallback?: (newTab: number) => void;
  total: number;
}

const Tabs = ({
  children,
  className,
  onTabChangeCallback,
  total,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const id = useId();

  useEffect(() => {
    if (!onTabChangeCallback) return;
    onTabChangeCallback(activeTab);
  }, [activeTab, onTabChangeCallback]);

  const showFirstTab = () => {
    setActiveTab(0);
  };

  const showLastTab = () => {
    setActiveTab(total - 1);
  };

  const showPreviousTab = () => {
    setActiveTab(Math.max(0, activeTab - 1));
  };
  const showNextTab = () => {
    setActiveTab(Math.min(total - 1, activeTab + 1));
  };

  return (
    <div className={className}>
      <TabContext.Provider
        value={{
          activeTab,
          id,
          setActiveTab,
          showFirstTab,
          showLastTab,
          showNextTab,
          showPreviousTab,
        }}
      >
        {children}
      </TabContext.Provider>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
