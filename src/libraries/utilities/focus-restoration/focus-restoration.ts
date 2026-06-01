import { FOCUSABLE_ELEMENTS_SELECTOR } from 'libraries/utilities/accessibility/get-all-potentially-tabbable-elements';

const findClosestFocusableElement = (
  originalElement: HTMLElement,
): HTMLElement | null => {
  const parent = originalElement.parentElement;

  if (!parent || !document.body.contains(parent)) {
    return null;
  }

  const focusableElements = parent.querySelectorAll<HTMLElement>(
    FOCUSABLE_ELEMENTS_SELECTOR,
  );

  if (focusableElements.length > 0) {
    return focusableElements[0];
  }

  return findClosestFocusableElement(parent);
};

export const restoreFocus = (triggerElement: HTMLElement | null): void => {
  if (!triggerElement) {
    document.body.focus();
    return;
  }

  if (document.body.contains(triggerElement)) {
    triggerElement.focus();
    return;
  }

  const focusableElement = findClosestFocusableElement(triggerElement);

  if (focusableElement) {
    focusableElement.focus();
    return;
  }

  document.body.focus();
};
