import { type JSX, useEffect, useRef } from 'react';
import { getAllPotentiallyTabbableElements } from 'libraries/utilities/accessibility/get-all-potentially-tabbable-elements';
import { useTabContext } from '../tabs';

interface TabContentProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  index: number;
}

const TabContent = ({ children, className, index }: TabContentProps) => {
  const { activeTab, id } = useTabContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const potentiallyTabableElements = getAllPotentiallyTabbableElements(
      ref.current,
    );

    potentiallyTabableElements?.forEach((tabableElement) => {
      tabableElement.tabIndex = activeTab === index ? 0 : -1;
    });
  }, [activeTab, index]);

  const isHidden = index !== activeTab;

  return (
    <div
      ref={ref}
      role="tabpanel"
      {...(isHidden
        ? { 'aria-hidden': true }
        : { 'aria-labelledby': `${id}-tab-button-${index}` })}
      className={className}
      hidden={isHidden}
      id={`${id}-tabcontent-${index}`}
    >
      {children}
    </div>
  );
};

TabContent.displayName = 'TabContent';

export default TabContent;
