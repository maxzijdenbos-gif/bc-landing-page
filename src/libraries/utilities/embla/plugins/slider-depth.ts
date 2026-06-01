import { EmblaPluginType } from 'embla-carousel';
import { SliderApi } from 'libraries/utilities/embla/embla.types';

const PLUGIN_NAME = 'slider-depth';

// How long the entrance animation should play. Given the ease-out easing, it's best to double this regarding perceived animation duration.
const ANIMATION_DURATION = 1000;

/**
 * Calculates the transformation for the slide, including scaling and translating it
 * based on its distance from the center of the container, creating a depth effect.
 *
 * @param slide - The current slide element
 * @param target - The target child element within the slide to apply styles
 * @param containerCenter - The center position of the container
 * @param slideCenter - The center position of the slide
 * @param width - The width of the slide
 */
const calculateTransform = (
  slide: HTMLElement,
  target: HTMLDivElement,
  containerCenter: number,
  slideCenter: number,
  width: number,
) => {
  const distance = containerCenter - slideCenter;
  const slidesDistance = Math.abs(distance) / width;
  const scale = Math.max(2 - slidesDistance / 2, 1);

  // Translate the slide left/right based on its distance and direction
  const translate = width * (2 - scale) * (distance >= 0 ? -1 : 1);

  // Apply z-index on the parent slide to prevent smaller slides overlapping scaled slides
  slide.style.zIndex = `${(2 - slidesDistance).toFixed(0)}`;

  // Apply the calculated scaling and translation with 3D transform
  target.setAttribute(
    'style',
    `transform: scale(${scale.toFixed(3)}) translate3d(${translate.toFixed(
      3,
    )}px, 0, 0);`,
  );
};

export interface SliderDepthOptions {
  doStartAnimation?: () => boolean;
  onInit?: (startAnimation: () => void) => void;
}

const SliderDepth: (options?: SliderDepthOptions) => EmblaPluginType = ({
  doStartAnimation = () => true,
  onInit,
} = {}) => {
  let api: SliderApi | undefined;
  let target: HTMLDivElement | undefined;
  let animationStarted: number | null = null;

  /**
   * Handles the scroll and resize events, applying depth effects to each slide.
   * For each slide, calculate its center and decide whether to show/hide and how to transform it.
   */

  const handleScroll = (api: SliderApi) => {
    const { x: containerX, width: containerWidth } = api
      .rootNode()
      .getBoundingClientRect();
    const containerCenter = containerX + containerWidth / 2;

    api.slideNodes().forEach((slide) => {
      const target = slide.childNodes[0] as HTMLDivElement;

      if (!target) return;

      const { x: slideX, width: slideWidth } = slide.getBoundingClientRect();
      const slideCenter = slideX + slideWidth / 2;

      // Hide slides that are completely outside the visible area to avoid glitches
      if (slideCenter < 0 || slideCenter > containerX + containerWidth) {
        return (target.style.opacity = '0');
      }

      calculateTransform(
        slide,
        target,
        containerCenter,
        slideCenter,
        slideWidth,
      );
    });
  };

  // Intended for use to tween between start and end relying on the browser to apply the animation.
  function setInitialAnimationState(api: SliderApi, normal: number) {
    // Setup
    const container = target || api.rootNode();
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.x + containerRect.width / 2;

    api.slideNodes().forEach((slide) => {
      const target = slide.childNodes[0] as HTMLDivElement;
      const slideRect = slide.getBoundingClientRect();

      if (!target) return;

      const slideCenter = slideRect.x + slideRect.width / 2;
      const distance = containerCenter - slideCenter;

      // If the element is not visible by the end of the animation, let's not have them animate from the center
      if (Math.abs(distance) >= containerRect.width / 2) {
        return;
      }

      // Apply the effect
      target.style.position = `relative`;
      target.style.left = `${distance * (1 - normal)}px`;
      target.style.top = `${
        (1 - normal) * ((window.innerHeight / 100) * 20)
      }px`;
      target.style.opacity = `${
        Math.abs(distance) >= slideRect.width / 2 ? normal : 1
      }`;

      target.style.transition = `all ${ANIMATION_DURATION}ms ease-in-out`;
    });
  }

  return {
    destroy: () => {
      api?.off('scroll', handleScroll);
      api?.off('resize', handleScroll);
    },

    init: (instance) => {
      api = instance as SliderApi;
      api.rootNode().style.pointerEvents = 'none';

      handleScroll(api);
      setInitialAnimationState(api, 0);

      // We relinquish control of when to start the animation to whichever component mounted the slider with this plugin
      if (onInit && doStartAnimation()) {
        onInit(() => {
          if (animationStarted !== null || !api) return;

          animationStarted = null;

          setInitialAnimationState(api, 1);

          setTimeout(() => {
            if (!api) return;

            api.on('scroll', handleScroll);
            api.on('resize', handleScroll);
            api.rootNode().style.pointerEvents = 'all';

            // Clear out style from entrance animation
            api.slideNodes().forEach((slide) => {
              (slide.childNodes[0] as HTMLDivElement)?.removeAttribute('style');
            });

            // Re-apply first frame of scroll animation
            handleScroll(api);
          }, ANIMATION_DURATION);
        });
      } else {
        handleScroll(api);
        api.on('scroll', handleScroll);
        api.on('resize', handleScroll);
        api.rootNode().style.pointerEvents = 'all';
      }
    },

    name: PLUGIN_NAME,
    options: {},
  };
};

export default SliderDepth;
