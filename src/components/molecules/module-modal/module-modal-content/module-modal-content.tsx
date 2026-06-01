import { useEffect, useRef, useState } from 'react';
import Image from 'components/atoms/image/image';
import RichText from 'components/atoms/rich-text/rich-text';
import Typography from 'components/atoms/typography/typography';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import MotionSlide from 'components/utilities/motion/entrances/motion-slide/motion-slide';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import { trackPopUpModal } from 'integrations/tracking/google-tag-manager/scripts';
import Tabs from '../../tabs/tabs';
import TabContent from '../../tabs/tabs-content/tabs-content';
import TabsNavigation from '../../tabs/tabs-navigation/tabs-navigation';
import { SingleTabContentProps } from '../module-modal';
import styles from '../module-modal.module.scss';

interface ModuleModalContentProps {
  modalIsVisible: boolean;
  /** The title of the modal */
  modalTitle?: string;
  /** List of tabs and their content */
  tabs?: SingleTabContentProps[];
}

const ModuleModalContent = ({
  tabs,
  modalIsVisible,
  modalTitle,
}: ModuleModalContentProps) => {
  const [initialMotionHasAnimated, setInitialMotionHasAnimated] =
    useState(false);
  const [tabsOpenKey, setTabsOpenKey] = useState(0);
  const previousActiveTab = useRef(0);

  useEffect(() => {
    if (modalIsVisible) queueMicrotask(() => setTabsOpenKey((i) => i + 1));
  }, [modalIsVisible]);

  const handleTabChange = (activeTab: number) => {
    // Report a change in active tab
    if (previousActiveTab.current !== activeTab) {
      trackPopUpModal({
        action: 'tab',
        clickText: tabs?.[activeTab]?.tabTitle,
        title: modalTitle,
      });
      previousActiveTab.current = activeTab;
    }
  };

  useEffect(() => {
    if (!modalIsVisible)
      queueMicrotask(() => setInitialMotionHasAnimated(false));
  }, [modalIsVisible]);

  return (
    <div className={styles.component}>
      {!!tabs?.length && (
        <Tabs
          key={tabsOpenKey}
          className={styles.tabsGrid}
          onTabChangeCallback={(newTab: number) => {
            handleTabChange(newTab);
          }}
          total={tabs.length}
        >
          {modalTitle && (
            <Typography
              className={styles.modalTitle}
              tag="h2"
              tagStyle="actionMedium"
              weight="heavy"
            >
              {modalTitle}
            </Typography>
          )}
          {tabs.length > 1 && (
            <TabsNavigation
              className={styles.tabsNavigation}
              tabTitles={tabs.map((tab) => tab.tabTitle)}
            />
          )}

          {tabs.map((tab, index) => (
            <TabContent key={index} className={styles.tabContent} index={index}>
              <div className={styles.imageContainer}>
                <Image
                  alt=""
                  className={styles.image}
                  fill
                  imageObject={tab.imageObject}
                  {...generateImageSizes(10, 10, 6, 6, 6)}
                />
              </div>
              <div className={styles.content}>
                <MotionSlide
                  animationDisabled={initialMotionHasAnimated}
                  direction="left-right"
                  initMotion={modalIsVisible}
                >
                  <Typography tag="h3" tagStyle="displayMedium">
                    {tab.tabHeadline}
                  </Typography>
                </MotionSlide>
                <MotionFade
                  animationDisabled={initialMotionHasAnimated}
                  animationEndCallback={() => {
                    setInitialMotionHasAnimated(true);
                  }}
                  delay="speed-slow"
                  initMotion={modalIsVisible}
                >
                  <RichText text={tab.tabText ?? ''} />
                </MotionFade>
              </div>
            </TabContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

ModuleModalContent.displayName = 'ModuleModalContent';

export default ModuleModalContent;
