const TABBABLE_QUERY = `
  input:not([tabindex^="- "]):not([disabled]),
  select:not([tabindex^="-"]):not([disabled]),
  textarea:not([tabindex^="-"]):not([disabled]),
  button:not([tabindex^="-"]):not([disabled]),
  a[href]:not([tabindex^="-"]):not([disabled]),
  [tabindex]:not([tabindex^="-"]):not([disabled])
`;

export const getAllTabbableElements = (ref: HTMLElement | null) => {
  if (!ref) return;

  return Array.from(ref.querySelectorAll<HTMLDivElement>(TABBABLE_QUERY));
};
