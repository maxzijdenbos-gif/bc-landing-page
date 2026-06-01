export const FOCUSABLE_ELEMENTS_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const getAllPotentiallyTabbableElements = (ref: HTMLElement | null) => {
  if (!ref) return;

  return Array.from(
    ref.querySelectorAll<HTMLDivElement>(FOCUSABLE_ELEMENTS_SELECTOR),
  );
};
