import { EmblaPluginType } from 'embla-carousel';
import {
  SliderApi,
  SliderPluginOptions,
} from 'libraries/utilities/embla/embla.types';

const PLUGIN_NAME = 'slider-accessibility';
export interface SliderAccessibilityOptions extends SliderPluginOptions {
  onPressEnter?: (api: SliderApi, current: number) => void;
  onUpdateAria?: (api: SliderApi, current: number, total: number) => string;
  singleSlideOnly?: boolean;
  skipAriaHidden?: boolean;
  totalSlides?: number;
}

const SliderAccessibility: (
  options?: SliderAccessibilityOptions,
) => EmblaPluginType = ({
  onUpdateAria: _onUpdateAria,
  singleSlideOnly = false,
  skipAriaHidden = false,
  totalSlides,
} = {}) => {
  let api: SliderApi | undefined;

  const updateSlideVisibility = () => {
    if (skipAriaHidden || !api) return;

    const slideNodes = api.slideNodes();
    const total =
      totalSlides && totalSlides > 0 ? totalSlides : slideNodes.length;

    if (total === 0) return;

    const logicalIndicesInView =
      totalSlides && totalSlides > 0
        ? new Set([api.selectedScrollSnap() % totalSlides])
        : new Set(api.slidesInView());

    const hasDuplicatedSlides =
      typeof totalSlides === 'number' &&
      totalSlides > 0 &&
      slideNodes.length > totalSlides;
    const selectedIndex = api.selectedScrollSnap();

    slideNodes.forEach((slide, index) => {
      const isVisible =
        singleSlideOnly || hasDuplicatedSlides
          ? index === selectedIndex
          : logicalIndicesInView.has(
              totalSlides && totalSlides > 0 ? index % totalSlides : index,
            );

      if (isVisible) {
        slide.removeAttribute('aria-hidden');
      } else {
        slide.setAttribute('aria-hidden', 'true');
      }
    });
  };

  return {
    destroy: () => {
      api?.off('select', updateSlideVisibility);
      api?.off('slidesInView', updateSlideVisibility);
    },
    init: (instance) => {
      api = instance as SliderApi;

      updateSlideVisibility();
      api.on('slidesInView', updateSlideVisibility);
      if (totalSlides && totalSlides > 0) {
        api.on('select', updateSlideVisibility);
      }
    },
    name: PLUGIN_NAME,
    options: {},
  };
};

export default SliderAccessibility;
