export const throttle = (
  func: () => unknown,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean },
) => {
  let args: any;
  let context: any;
  let previous = 0;
  let result: any;
  let timeout: any = null;

  if (!options) {
    options = {};
  }

  const later = () => {
    previous = options?.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function (context: any) {
    const now = Date.now();

    if (!previous && options?.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);

    // eslint-disable-next-line prefer-rest-params
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options?.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
};
