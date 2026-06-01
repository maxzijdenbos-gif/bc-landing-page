import { EmblaPluginType } from 'embla-carousel';
import {
  SliderApi,
  SliderEventName,
  SliderPluginOptions,
} from 'libraries/utilities/embla/embla.types';

const PLUGIN_NAME = 'slider-progress';

export const SLIDER_PROGRESS_EVENT_NAME = PLUGIN_NAME as SliderEventName;

export interface SliderProgressOptions extends SliderPluginOptions {
  onProgress?: (index: number, api: SliderApi) => void;
  scrollEndDelay?: number;
}

const getRectCenter = (rect: { width: number; x: number }) =>
  rect.x + rect.width / 2;

const getClosestSlideToCenter = (api: SliderApi): number => {
  const slides = api.slideNodes();
  const rootCenter = getRectCenter(api.rootNode().getBoundingClientRect());

  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const slideCenter = getRectCenter(slide.getBoundingClientRect());
    const distance = Math.abs(rootCenter - slideCenter);

    if (distance < closestDistance) {
      closestIndex = index;
      closestDistance = distance;
    }
  });

  return closestIndex;
};

const SliderProgress: (options?: SliderProgressOptions) => EmblaPluginType = ({
  onProgress,
  scrollEndDelay = 10,
} = {}) => {
  let api: SliderApi | undefined;
  let lastIndex = -1;
  let ignoreCenter = false;
  let rafId: number | null = null;
  let scrollEndTimer: NodeJS.Timeout | null = null;

  const emitProgress = (index: number) => {
    if (!api) return;
    lastIndex = index;
    api.emit(SLIDER_PROGRESS_EVENT_NAME);
    onProgress?.(index, api);
  };

  const updateProgress = () => {
    if (!api) return;
    const centeredIndex = getClosestSlideToCenter(api);

    if (!ignoreCenter && lastIndex !== centeredIndex) {
      emitProgress(centeredIndex);
    }
  };

  const handleScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      updateProgress();
    });

    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      ignoreCenter = false;
      updateProgress();
    }, scrollEndDelay);
  };

  const handleSelect = () => {
    if (!api) return;
    const selected = api.selectedScrollSnap();

    ignoreCenter = true;
    emitProgress(selected);
  };

  return {
    destroy: () => {
      if (!api) return;
      api.off('scroll', handleScroll);
      api.off('select', handleSelect);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    },
    init: (instance) => {
      api = instance;

      const initialIndex = getClosestSlideToCenter(api);

      emitProgress(initialIndex);

      api.getProgress = () => lastIndex;

      api.on('scroll', handleScroll);
      api.on('select', handleSelect);
    },

    name: PLUGIN_NAME,
    options: {},
  };
};

export default SliderProgress;
