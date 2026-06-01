import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Loader, { LoaderVariant } from 'components/atoms/loader/loader';

interface LoaderState {
  id: string;
  isVisible: boolean;
  message?: string;
  variant: LoaderVariant;
}

interface LoaderContextValue {
  hideAllLoaders: () => void;
  hideLoader: (id: string) => void;
  isLoading: boolean;
  showHardLoader: (message?: string) => string;
  showSoftLoader: (message?: string) => string;
}

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [loaders, setLoaders] = useState<Map<string, LoaderState>>(new Map());
  const idCounter = useRef(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const generateId = useCallback(() => {
    idCounter.current += 1;
    return `loader-${idCounter.current}`;
  }, []);

  const showSoftLoader = useCallback(
    (message?: string) => {
      const id = generateId();
      setLoaders((prev) => {
        const next = new Map(prev);
        next.set(id, { id, isVisible: true, message, variant: 'soft' });
        return next;
      });
      return id;
    },
    [generateId],
  );

  const showHardLoader = useCallback(
    (message?: string) => {
      const id = generateId();
      setLoaders((prev) => {
        const next = new Map(prev);
        next.set(id, { id, isVisible: true, message, variant: 'hard' });
        return next;
      });
      return id;
    },
    [generateId],
  );

  const hideLoader = useCallback((id: string) => {
    setLoaders((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const hideAllLoaders = useCallback(() => {
    setLoaders(new Map());
  }, []);

  const isLoading = loaders.size > 0;
  const hasHardLoader = Array.from(loaders.values()).some(
    (loader) => loader.variant === 'hard',
  );

  const activeHardLoader = Array.from(loaders.values()).find(
    (loader) => loader.variant === 'hard',
  );

  useEffect(() => {
    if (!mainRef.current) return;

    if (hasHardLoader) {
      mainRef.current.setAttribute('inert', '');
      mainRef.current.setAttribute('aria-hidden', 'true');
    } else {
      mainRef.current.removeAttribute('inert');
      mainRef.current.removeAttribute('aria-hidden');
    }
  }, [hasHardLoader]);

  const value = useMemo(
    () => ({
      hideAllLoaders,
      hideLoader,
      isLoading,
      showHardLoader,
      showSoftLoader,
    }),
    [hideAllLoaders, hideLoader, isLoading, showHardLoader, showSoftLoader],
  );

  return (
    <LoaderContext.Provider value={value}>
      <div ref={mainRef}>{children}</div>
      {activeHardLoader && (
        <Loader
          isVisible={activeHardLoader.isVisible}
          message={activeHardLoader.message}
          variant="hard"
        />
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextValue => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }

  return context;
};

export default LoaderContext;
