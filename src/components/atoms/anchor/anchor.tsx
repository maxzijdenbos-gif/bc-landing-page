import { useEffect, useRef } from 'react';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import useHash from 'libraries/hooks/use-hash';
import styles from './anchor.module.scss';

// ModuleWrapper is needed in order to keep our spacing system between modules
// Needs color as well in order to behave the same regarding padding as the other modules

export interface AnchorProps extends ModuleWrapperProps {
  anchorId?: string;
}

const Anchor = ({ anchorId, color }: AnchorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const didScroll = useRef(false);
  const { hash } = useHash();

  useEffect(() => {
    // Early return if we dont have what we need or if we already scrolled
    if (didScroll.current || !ref.current || !hash || !anchorId) return;

    if (hash === anchorId) {
      didScroll.current = true;
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [anchorId, hash, ref]);

  return (
    <ModuleWrapper anchor className={styles.component} color={color}>
      <div ref={ref}></div>
    </ModuleWrapper>
  );
};

Anchor.displayName = 'Anchor';

export default Anchor;
