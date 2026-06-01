import { useCallback, useEffect, useRef, useState } from 'react';

interface UseMultilineEllipsisOptions {
  lineClamp: number;
  text: string;
}

export function useMultilineEllipsis({
  text,
  lineClamp,
}: UseMultilineEllipsisOptions) {
  const ref = useRef<HTMLElement>(null);
  const [clampedText, setClampedText] = useState<string>(text);

  const updateClamp = useCallback(() => {
    const el = ref.current;

    if (!el) return;

    // Apply inline clamping styles
    Object.assign(el.style, {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: String(lineClamp),
    });

    const original = text.trim();
    const words = original.split(/\s+/);

    const isClamped = () => el.scrollHeight > el.offsetHeight + 1;

    // First try the full string
    el.textContent = original;
    if (!isClamped()) {
      setClampedText(original);

      return;
    }

    // Word-level binary search
    let lo = 0;
    let hi = words.length;
    let bestFit = original;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const candidate = words.slice(0, mid).join(' ') + '…';

      el.textContent = candidate;

      if (isClamped()) {
        hi = mid - 1;
      } else {
        bestFit = candidate;
        lo = mid + 1;
      }
    }

    // Final pass: trim characters to avoid mid-word cutoff
    el.textContent = bestFit;
    if (isClamped()) {
      const raw = bestFit.replace(/…$/, '');
      const chars = raw.split('');
      let loChar = 0;
      let hiChar = chars.length;
      let bestCharFit = raw;

      while (loChar <= hiChar) {
        const mid = Math.floor((loChar + hiChar) / 2);
        const candidate = chars.slice(0, mid).join('') + '…';

        el.textContent = candidate;

        if (isClamped()) {
          hiChar = mid - 1;
        } else {
          bestCharFit = candidate;
          loChar = mid + 1;
        }
      }

      setClampedText(bestCharFit);
    } else {
      setClampedText(bestFit);
    }
  }, [text, lineClamp]);

  useEffect(() => {
    queueMicrotask(() => updateClamp());

    const observer = new ResizeObserver(() => {
      updateClamp();
    });

    const current = ref.current;

    if (current) observer.observe(current);

    return () => observer.disconnect();
  }, [updateClamp]);

  return { ref, text: clampedText };
}
