import { useEffect, useRef } from 'react';

const useOnce = (fn: CallableFunction) => {
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    fn();
  }, [fn]);
};

export default useOnce;
