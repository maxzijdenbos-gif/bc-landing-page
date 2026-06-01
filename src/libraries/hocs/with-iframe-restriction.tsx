import router from 'next/router';
import { ComponentType } from 'react';
import React from 'react';
import useOnce from 'libraries/hooks/use-once';

const isIframe = () => {
  try {
    return window.self !== window.top;
  } catch (_) {
    return true;
  }
};

const ejectIfNotIframe = () => !isIframe() && router.replace('/');

const withIframeRestriction = <P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> => {
  const HOC: React.FC<P> = (props: P) => {
    useOnce(ejectIfNotIframe);

    return <Component {...props} />;
  };

  HOC.displayName = `WithIframeRestriction(${
    Component.displayName || Component.name || 'Component'
  })`;

  return HOC;
};

export default withIframeRestriction;
