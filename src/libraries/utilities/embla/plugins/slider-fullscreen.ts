import { EmblaPluginType } from 'embla-carousel';
import {
  SliderApi,
  SliderEventName,
  SliderPluginOptions,
} from 'libraries/utilities/embla/embla.types';

const PLUGIN_NAME = 'slider-fullscreen';

export const SLIDER_FULLSCREEN_EVENT_NAME = PLUGIN_NAME as SliderEventName;

export interface SliderFullscreenOptions extends SliderPluginOptions {
  setActive: (active: boolean) => void;
}

const SliderFullscreen: (
  options: SliderFullscreenOptions,
) => EmblaPluginType = ({ setActive }) => {
  let api: SliderApi | undefined;
  let active = false;

  const getFullscreen = () => active;

  const requestFullscreen = () => {
    if (active || !api) return;

    api
      .rootNode()
      .ownerDocument.body.setAttribute('style', 'overflow: hidden;');

    active = true;
    setActive(true);
    setTimeout(() => {
      api?.rootNode().focus();
      api?.emit(SLIDER_FULLSCREEN_EVENT_NAME);
    }, 0);
  };

  const stopFullscreen = () => {
    if (!active || !api) return;

    api.rootNode().ownerDocument.body.removeAttribute('style');
    api.rootNode().focus();
    active = false;
    setActive(false);
    setTimeout(() => {
      api?.rootNode().focus();
      api?.emit(SLIDER_FULLSCREEN_EVENT_NAME);
    }, 0);
  };

  return {
    destroy: () => {
      if (!api) return;

      api.requestFullscreen = undefined;
      api.exitFullscreen = undefined;
      api.getFullscreen = undefined;
    },
    init: (instance) => {
      api = instance;

      api.requestFullscreen = requestFullscreen;
      api.exitFullscreen = stopFullscreen;
      api.getFullscreen = getFullscreen;
    },
    name: PLUGIN_NAME,
    options: {},
  };
};

export default SliderFullscreen;
