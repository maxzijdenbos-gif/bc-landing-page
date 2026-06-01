import { useEffect, useState } from 'react';

const useHash = () => {
  const [hash, setHash] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.replace('#', ''));
    };

    queueMicrotask(() => {
      if (window.location.hash) {
        setHash(window.location.hash.replace('#', ''));
      }
      setIsReady(true);
    });

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return {
    clearHash: () => {
      setHash(undefined);
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search,
      );
    },
    hash,
    isReady,
    setHash: (newHash: string) => {
      window.location.hash = newHash;
    },
  };
};

export default useHash;
