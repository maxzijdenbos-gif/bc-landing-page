/* eslint-disable sort-keys */
import { ModuleModalProps } from './module-modal';

const defaultStub: ModuleModalProps = {
  modalId: 'ModuleModal',
  modalTitle: 'Modal title',
  tabs: [
    {
      imageObject: {
        diImage: {
          crop: [0, 0, 0, 0],
          rot: 0,
          hue: 0,
          sat: 0,
          bri: 0,
          fliph: false,
          flipv: false,
          poi: {
            x: -1,
            y: -1,
          },
          aspectLock: 'clear',
          image: {
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'merklenesandbox',
            mimeType: 'image/png',
            name: 'BikePortrait1',
            id: '3182f5d1-c448-4d15-87b6-27c93daea874',
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
          },
        },
        alt: 'Overdrive',
      },
      tabHeadline: 'Overdrive aero',
      tabText:
        'The fork has a new D-shaped steerer tube with corresponding spacers that, in addition to improving aerodynamics, also allow the brake and shifter cables or wires to be internally routed through the handlebars, stem and frame/fork for a cleaner profile. This keeps cables hidden from the wind while minimizing the complexities associated with many of today’s road bikes that have completely internal routing.\n\nThe fork has a new D-shaped steerer tube with corresponding spacers that, in addition to improving aerodynamics, also allow the brake and shifter cables or wires to be internally routed through the handlebars, stem and frame/fork for a cleaner profile. This keeps cables hidden from the wind while minimizing the complexities associated with many of today’s road bikes that have completely internal routing.\n\nThe fork has a new D-shaped steerer tube with corresponding spacers that, in addition to improving aerodynamics, also allow the brake and shifter cables or wires to be internally routed through the handlebars, stem and frame/fork for a cleaner profile. This keeps cables hidden from the wind while minimizing the complexities associated with many of today’s road bikes that have completely internal routing.',
      tabTitle: 'Overdrive',
    },
    {
      imageObject: {
        diImage: {
          crop: [0, 0, 0, 0],
          rot: 0,
          hue: 0,
          sat: 0,
          bri: 0,
          fliph: false,
          flipv: false,
          poi: {
            x: -1,
            y: -1,
          },
          aspectLock: 'clear',
          image: {
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'merklenesandbox',
            mimeType: 'image/png',
            name: 'MY25 TCR Advanced Pro 1-Di2_Color A Carbon_Chrome',
            id: '1c86307b-2e08-47a5-a996-2012088a0740',
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
          },
        },
        alt: 'Cockpit',
      },
      tabHeadline: 'Cockpit components',
      tabText:
        '## Subheadline\n\nBody text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \\\n[Link in tex](https:///www.google.com "Google")t Egestas pretium aenean pharetra magna ac. \n\n**Bold text. ltrices dui sapien eget mi proin sed libero. Cum sociis natoque penatibus et magnis dis. Felis eget velit aliquet sagittis id consectetur purus ut.** \n\n*Italic. Ultrices dui sapien eget mi proin sed libero. Cum sociis natoque penatibus et magnis dis. Felis eget velit aliquet sagittis id consectetur purus ut.*',
      tabTitle: 'Cockpit',
    },
  ],
};
const onlyOneTab: ModuleModalProps = {
  modalId: 'ModuleModal',
  modalTitle: 'Modal title',
  tabs: [
    {
      imageObject: {
        diImage: {
          crop: [0, 0, 0, 0],
          rot: 0,
          hue: 0,
          sat: 0,
          bri: 0,
          fliph: false,
          flipv: false,
          poi: {
            x: -1,
            y: -1,
          },
          aspectLock: 'clear',
          image: {
            defaultHost: 'cdn.media.amplience.net',
            endpoint: 'merklenesandbox',
            mimeType: 'image/png',
            name: 'BikePortrait1',
            id: '3182f5d1-c448-4d15-87b6-27c93daea874',
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
            },
          },
        },
        alt: 'Overdrive',
      },
      tabHeadline: 'Overdrive aero',
      tabText:
        'The fork has a new D-shaped steerer tube with corresponding spacers that, in addition to improving aerodynamics, also allow the brake and shifter cables or wires to be internally routed through the handlebars, stem and frame/fork for a cleaner profile. This keeps cables hidden from the wind while minimizing the complexities associated with many of today’s road bikes that have completely internal routing.\n\nThe fork has a new D-shaped steerer tube with corresponding spacers that, in addition to improving aerodynamics, also allow the brake and shifter cables or wires to be internally routed through the handlebars, stem and frame/fork for a cleaner profile. This keeps cables hidden from the wind while minimizing the complexities associated with many of today’s road bikes that have completely internal routing.\n\nThe fork has a new D-shaped steerer tube with corresponding spacers that, in addition to improving aerodynamics, also allow the brake and shifter cables or wires to be internally routed through the handlebars, stem and frame/fork for a cleaner profile. This keeps cables hidden from the wind while minimizing the complexities associated with many of today’s road bikes that have completely internal routing.',
      tabTitle: 'Overdrive',
    },
  ],
};

export default <Record<string, ModuleModalProps>>{
  default: defaultStub,
  oneTab: onlyOneTab,
};
