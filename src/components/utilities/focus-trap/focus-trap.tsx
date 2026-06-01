import React, { useEffect } from 'react';
import { getAllTabbableElements } from 'libraries/utilities/accessibility/get-all-tabbable-elements';

interface FocusTrapProps {
  children?: React.ReactNode | React.ReactNode[];
  focusAreaRef: React.RefObject<HTMLDivElement | null>;
  focusThisRefOnReset?: React.RefObject<
    HTMLElement | null | undefined | HTMLDivElement
  >;
  resetEventsValue?: any;
}

const FocusTrap = ({
  children,
  focusAreaRef,
  focusThisRefOnReset,
  resetEventsValue,
}: FocusTrapProps) => {
  useEffect(() => {
    const refNode = focusAreaRef?.current;

    const changeFocusOnUpdate = (element: HTMLElement) => {
      const isElementFocusable =
        element.tabIndex !== -1 &&
        (element instanceof HTMLButtonElement ||
          element instanceof HTMLAnchorElement ||
          element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement ||
          element instanceof HTMLTextAreaElement ||
          (element instanceof HTMLElement &&
            element.getAttribute('tabindex') !== null));

      if (isElementFocusable) {
        element.focus();
        return;
      }

      const tabbableElementsInContainer = getAllTabbableElements(element);
      const firstFocusableElementInContainer =
        tabbableElementsInContainer?.find((el) => el.tabIndex !== -1);

      firstFocusableElementInContainer?.focus();
    };

    if (!refNode) return;

    if (focusThisRefOnReset?.current) {
      changeFocusOnUpdate(focusThisRefOnReset.current);
    }

    const isElementVisible = (element: HTMLElement): boolean => {
      if (element.tabIndex === -1) return false;

      let current: Element | null = element;
      while (current && current !== refNode.parentElement) {
        if ((current as HTMLElement).hidden) return false;
        current = current.parentElement;
      }

      return true;
    };

    const handleTabTrapping = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const tabbableElements = getAllTabbableElements(refNode);
      if (!tabbableElements || tabbableElements.length === 0) return;

      // Filter only visible focusable elements
      const visibleElements = tabbableElements.filter(isElementVisible);
      if (visibleElements.length === 0) return;

      const firstFocusableElement = visibleElements[0];
      const lastFocusableElement = visibleElements[visibleElements.length - 1];

      const isLastTabbedElement =
        event.target === lastFocusableElement && !event.shiftKey;

      const isFirstShiftTabbedElement =
        event.target === firstFocusableElement && event.shiftKey;

      if (isFirstShiftTabbedElement) {
        lastFocusableElement?.focus();
        event.preventDefault();
      }

      if (isLastTabbedElement) {
        firstFocusableElement?.focus();
        event.preventDefault();
      }
    };

    refNode?.addEventListener('keydown', handleTabTrapping);

    return () => {
      refNode?.removeEventListener('keydown', handleTabTrapping);
    };
    // we do not want to refocus when focusThisRefOnReset updates as that will e.g. lead to change in focus before the transition of the burger menu is complete causing a clithy animation
    // refocus should be controlled by resetEventsValue.
    // Be aware of having updated the refs before resetEventsValue changes
    // focusAreaRef is expected to be stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetEventsValue]);

  return children;
};

FocusTrap.displayName = 'FocusTrap';
export default FocusTrap;
