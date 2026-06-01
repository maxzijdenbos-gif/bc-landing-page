import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Typography from 'components/atoms/typography/typography';
import { useTabContext } from '../tabs';
import styles from './tabs-navigation.module.scss';

interface TabsNavigationProps {
  className?: string;
  tabTitles: string[];
}

const TabsNavigation = ({ className, tabTitles }: TabsNavigationProps) => {
  const {
    activeTab,
    setActiveTab,
    id,
    showPreviousTab,
    showNextTab,
    showFirstTab,
    showLastTab,
  } = useTabContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isFadeVisible, setIsFadeVisible] = useState(false);
  const [updateFocus, setUpdateFocus] = useState(false);

  useEffect(() => {
    if (buttonsRef.current && activeTab !== undefined && updateFocus) {
      buttonsRef.current[activeTab].focus();
    }
    queueMicrotask(() => setUpdateFocus(false));
  }, [activeTab, buttonsRef, updateFocus]);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    const updateFade = () => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      setIsFadeVisible(!atEnd);
    };

    updateFade();
    el.addEventListener('scroll', updateFade);
    window.addEventListener('resize', updateFade);

    return () => {
      el.removeEventListener('scroll', updateFade);
      window.removeEventListener('resize', updateFade);
    };
  }, []);

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        setUpdateFocus(true);
        showPreviousTab();
        flag = true;
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        setUpdateFocus(true);
        showNextTab();
        flag = true;
        break;

      case 'Home':
        setUpdateFocus(true);
        showFirstTab();
        flag = true;
        break;

      case 'End':
        setUpdateFocus(true);
        showLastTab();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <div className={classNames(styles.component, className)}>
      <div
        ref={scrollRef}
        className={styles.scrollableContainer}
        role="tablist"
      >
        {tabTitles.map((tabTitle, index) => (
          <button
            key={tabTitle}
            type="button"
            role="tab"
            ref={(node) => {
              if (node) buttonsRef.current[index] = node;
            }}
            id={`${id}-tab-button-${index}`}
            aria-controls={`${id}-tabcontent-${index}`}
            aria-selected={index === activeTab}
            tabIndex={index === activeTab ? 0 : -1}
            className={classNames(styles.tabLink, {
              [styles.activeTabLink]: index === activeTab,
            })}
            onClick={() => setActiveTab?.(index)}
            onKeyDown={onKeyDownHandler}
          >
            <Typography tagStyle="bodyMedium">{tabTitle}</Typography>
          </button>
        ))}
      </div>

      <div
        className={classNames(styles.rightFade, {
          [styles.visible]: isFadeVisible,
        })}
      />
    </div>
  );
};

TabsNavigation.displayName = 'TabsNavigation';

export default TabsNavigation;
