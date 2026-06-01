import { useEffect, useState } from 'react';

/**
 * Returns `value` only after it has stayed unchanged for `delayMs` (leading edge
 * matches `value` on first render).
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);

    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
