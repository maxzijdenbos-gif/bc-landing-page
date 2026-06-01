import type { PopoverProps } from './popover';

/** Stub shape: PopoverProps without trigger (trigger is provided in stories). */
type PopoverStubProps = Omit<PopoverProps, 'trigger'>;

const defaultStub: PopoverStubProps = {
  children:
    'Destination Fee reflects costs incurred in transportation, logistics, and other associated fees. The destination fee is non-refundable or negotiable.',
  showArrow: true,
  side: 'top',
  sideOffset: 5,
  triggerAriaLabel: 'Destination fee information',
};

const bottomStub: PopoverStubProps = {
  ...defaultStub,
  side: 'bottom',
};

const noArrowStub: PopoverStubProps = {
  ...defaultStub,
  showArrow: false,
};

export default <Record<string, PopoverStubProps>>{
  bottom: bottomStub,
  default: defaultStub,
  noArrow: noArrowStub,
};
