import { useEffect, useRef } from 'react';
import { trackCarouselInteraction } from 'integrations/tracking/google-tag-manager/scripts';
import { SliderApi } from 'libraries/utilities/embla/embla.types';

const useSliderTracking = (title?: string, sliderApi?: SliderApi) => {
  const didStart = useRef(false);
  const didComplete = useRef(false);

  // Internal tracker for seen slide indexes
  const itemVisibility = useRef<boolean[]>([]);

  useEffect(() => {
    // Dont try if slider is not ready
    if (!sliderApi) return;

    // Begin tracking on select (for example when clicking navigation button)
    // or
    // Begin tracking on scroll (dragging with mouse or touch)
    const handleStart = () => {
      if (didStart.current || didComplete.current) return;

      didStart.current = true;

      // Setup empty visibility array derived from slideNodes
      itemVisibility.current = sliderApi.slideNodes().map(() => false);

      // Turn off event listeners for this action
      sliderApi.off('select', handleStart);
      sliderApi.off('scroll', handleStart);

      // Report to tracking
      trackCarouselInteraction({
        action: 'start',
        title,
      });
    };

    const handleVisibilityTracking = () => {
      if (didComplete.current || !didStart.current) return;

      // SlidesInView is an array of visible slide indexes. We map them positively to the visibility array
      sliderApi
        .slidesInView()
        .map((slideIndex) => (itemVisibility.current[slideIndex] = true));

      // If there does not exist a false visibility index
      if (!itemVisibility.current.some((wasSeen) => !wasSeen)) {
        didComplete.current = true;

        // Turn off event listeners for this action
        sliderApi.off('slidesInView', handleVisibilityTracking);

        // Report to tracking
        trackCarouselInteraction({
          action: 'complete',
          title,
        });
      }
    };

    // Event listener setup
    sliderApi.on('select', handleStart);
    sliderApi.on('scroll', handleStart);
    sliderApi.on('slidesInView', handleVisibilityTracking);

    return () => {
      // Gracefully handle de-mount
      sliderApi.off('select', handleStart);
      sliderApi.off('scroll', handleStart);
      sliderApi.off('slidesInView', handleVisibilityTracking);
    };
  }, [sliderApi, title]);
};

export default useSliderTracking;
