import { EmblaPluginType } from 'embla-carousel';
import { SliderApi } from 'libraries/utilities/embla/embla.types';

const PLUGIN_NAME = 'slider-perspective';

// Parameters
const PERSPECTIVE = 500;
const DISTANCE_X_MULTIPLIER = 0.5;
const DISTANCE_Z_MULTIPLIER = 0.15;

const SliderPerspective: () => EmblaPluginType = () => {
  let api: SliderApi | undefined;
  let delta = 0;

  const handleScroll = (api: SliderApi) => {
    if (performance.now() - delta < 10) return;
    delta = performance.now();

    // Timeout used here to fix issue with timing while user uses tab-navigation.
    setTimeout(() => {
      // Pre-fetch rects
      const containerRect = api.rootNode().getBoundingClientRect();
      const containerCenter = containerRect.x + containerRect.width / 2;

      api.slideNodes().forEach((slideElement) => {
        // Pre-fetch rects
        const slideRect = slideElement.getBoundingClientRect();
        const slideCenter = slideRect.x + slideRect.width / 2;

        // Calculate distance (0 to negative number)
        const distance = Math.min(
          0,
          containerCenter - slideCenter + slideRect.width / 2,
        );

        const element = slideElement.childNodes[0] as HTMLDivElement;

        // Return early if we have no manipulation target
        if (!element) return;

        // Add CSS targetable data-distance ( "true" or "false")
        slideElement.setAttribute('data-distance', `${distance < 0}`);

        // Apply 3D effect. Move item back in space, but also a little bit to the left, so create the illusion of stacking.
        // Remember, the distance variable is negative.
        element.style.transform =
          distance < 0
            ? `perspective(${PERSPECTIVE}px) translate3d(${
                distance * DISTANCE_X_MULTIPLIER
              }px, 0px, ${distance * DISTANCE_Z_MULTIPLIER}px)`
            : '';
      });
    }, 0);
  };

  return {
    destroy: () => {
      // Unset events
      api?.off('scroll', handleScroll);
      api?.off('resize', handleScroll);
    },

    init: (instance) => {
      api = instance as SliderApi;

      // Start once
      handleScroll(api);

      // Set events
      api.on('scroll', handleScroll);
      api.on('resize', handleScroll);
    },

    name: PLUGIN_NAME,
    options: {},
  };
};

export default SliderPerspective;
