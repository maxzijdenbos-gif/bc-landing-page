import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import useEmblaCarousel, { EmblaViewportRefType } from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useMemo } from 'react';
import { SliderApi } from 'libraries/utilities/embla/embla.types';
import SliderAccessibility, {
  SliderAccessibilityOptions,
} from 'libraries/utilities/embla/plugins/slider-accessibility';
import SliderDepth, {
  SliderDepthOptions,
} from 'libraries/utilities/embla/plugins/slider-depth';
import SliderFullscreen, {
  SliderFullscreenOptions,
} from 'libraries/utilities/embla/plugins/slider-fullscreen';
import SliderProgress, {
  SliderProgressOptions,
} from 'libraries/utilities/embla/plugins/slider-progress';
import SliderScaleSlide, {
  SliderScaleSlideOptions,
} from 'libraries/utilities/embla/plugins/slider-scale-slide';

interface SliderFeatures {
  accessibility?: SliderAccessibilityOptions;
  animationDepth?: SliderDepthOptions;
  animationScale?: SliderScaleSlideOptions;
  fullscreen?: SliderFullscreenOptions;
  progress?: SliderProgressOptions;
}

const generatePlugins = (features?: SliderFeatures) => {
  const plugins = [
    WheelGesturesPlugin(),
    SliderAccessibility(features?.accessibility),
    SliderProgress(features?.progress),
  ];

  if (features?.fullscreen) plugins.push(SliderFullscreen(features.fullscreen));
  if (features?.animationDepth)
    plugins.push(SliderDepth(features.animationDepth));
  if (features?.animationScale)
    plugins.push(SliderScaleSlide(features.animationScale));

  return plugins;
};

const useSlider = (
  features?: SliderFeatures,
  emblaOptions: EmblaOptionsType = {},
  emblaPlugins: EmblaPluginType[] = [],
) => {
  const plugins = useMemo(() => generatePlugins(features), [features]);

  return useEmblaCarousel(emblaOptions, [...plugins, ...emblaPlugins]) as [
    EmblaViewportRefType,
    SliderApi | undefined,
  ];
};

export default useSlider;
