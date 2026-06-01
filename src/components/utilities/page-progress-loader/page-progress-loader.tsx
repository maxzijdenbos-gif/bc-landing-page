import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import { memo, useEffect, useState } from 'react';
import styles from './page-progress-loader.module.scss';

const PageProgressLoader = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsVisible(true);
      setIsDone(false);
    };

    const handleComplete = () => {
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        setIsVisible(false);
      }, 1000);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('beforeHistoryChange', handleComplete);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('beforeHistoryChange', handleComplete);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div
      className={classNames(styles.component, {
        [styles.isVisible]: isVisible,
        [styles.isDone]: isDone,
      })}
    />
  );
};

export default memo(PageProgressLoader);
