import { EmblaPluginType } from 'embla-carousel';
import {
  SliderApi,
  SliderEventName,
} from 'libraries/utilities/embla/embla.types';

const PLUGIN_NAME = 'slider-scale-slide';

export interface SliderScaleSlideOptions {
  elementSelectorToScale: string;
}

const TWEEN_FACTOR_BASE = 0.3;
const MINIMUM_SCALE = 0.7;
const MAXIMUM_SCALE = 1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const SliderScaleSlide: (
  options: SliderScaleSlideOptions,
) => EmblaPluginType = ({ elementSelectorToScale }) => {
  let api: SliderApi | undefined;

  let tweenFactor = 0;
  let tweenNodes: any[] = [];

  const setTweenNodes = (emblaApi: SliderApi): void => {
    tweenNodes = emblaApi.slideNodes().map((slideNode) => {
      const element = slideNode.querySelector(elementSelectorToScale);

      return element as HTMLElement;
    });
  };

  const setTweenFactor = (emblaApi: SliderApi) => {
    tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  };

  const tweenScale = (emblaApi: SliderApi, eventName?: SliderEventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
        const scale = numberWithinRange(
          tweenValue,
          MINIMUM_SCALE,
          MAXIMUM_SCALE,
        ).toString();
        const tweenNode = tweenNodes[slideIndex];

        if (tweenNode) tweenNode.style.scale = `${scale}`;
      });
    });
  };

  return {
    destroy: () => {
      if (!api) return;

      api
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenScale)
        .off('scroll', tweenScale)
        .off('slideFocus', tweenScale);
    },
    init: (instance) => {
      api = instance;

      setTweenNodes(api);
      setTweenFactor(api);
      tweenScale(api);

      api
        .on('reInit', setTweenNodes)
        .on('reInit', setTweenFactor)
        .on('reInit', tweenScale)
        .on('scroll', tweenScale)
        .on('slideFocus', tweenScale);
    },
    name: PLUGIN_NAME,
    options: {},
  };
};

export default SliderScaleSlide;
