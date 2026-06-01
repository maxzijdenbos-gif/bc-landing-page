import { useEffect, useState } from 'react';

const dynamicSdk = async () => {
  const { init } = await import('dc-extensions-sdk');

  return await init();
};

interface ReturnType<T> {
  extensionSdk?: T;
  hasError?: boolean;
  isLoading?: boolean;
}

const useExtensionSdk: <T>() => ReturnType<T> = <T,>() => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [extensionSdk, setExtensionSdk] = useState<T>();

  useEffect(() => {
    if (extensionSdk) return;
    const asyncCall = async () => {
      try {
        const instance = await dynamicSdk();

        if (!instance) return setHasError(true);
        setExtensionSdk(instance as T);
      } catch (_) {
        setHasError(true);
      }
      setIsLoading(false);
    };

    asyncCall();
  }, [extensionSdk]);

  return {
    extensionSdk,
    hasError,
    isLoading,
  };
};

export default useExtensionSdk;
