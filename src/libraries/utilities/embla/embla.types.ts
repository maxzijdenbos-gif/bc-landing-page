import { EmblaCarouselType } from 'embla-carousel';
import { EmblaEventType } from 'embla-carousel';
import { RefObject } from 'react';

export interface SliderApi extends EmblaCarouselType {
  exitFullscreen?: () => void;
  getFullscreen?: () => boolean;
  getProgress?: () => number;
  requestFullscreen?: () => void;
}

export type SliderEventName = EmblaEventType;

export interface SliderPluginOptions {
  rootNode?: RefObject<HTMLDivElement | null>;
}

export interface SliderLabels {
  closeFullscreen?: string;
  goToNext?: string;
  goToPrevious?: string;
}
