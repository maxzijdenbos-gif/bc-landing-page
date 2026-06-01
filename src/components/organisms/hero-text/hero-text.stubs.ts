/* eslint-disable sort-keys */
import { HeroTextProps } from './hero-text';

const defaultStub: HeroTextProps = {
  headline:
    'Saddle Up with Confidence: What to know before your Bike Fit Appointment',
};
const recut: HeroTextProps = {
  doRecut: true,
  headline:
    'Saddle Up with Confidence: What to know before your Bike Fit Appointment',
};
const withButtons: HeroTextProps = {
  headline:
    'Saddle Up with Confidence: What to know before your Bike Fit Appointment',
  buttonGroup: [
    {
      link: {
        linkText: 'This is a link',
      },
    },
    {
      link: { linkText: 'This is a link' },
      style: 'Secondary',
    },
  ],
  leadParagraph:
    "Everyone's unique body shape and size, along with injuries and personal goals, can affect how comfortable and efficient you are on your bike. Our bikes have adjustable components to tailor to your specific needs. Bike fit aims to optimize comfort, efficiency, and power by adjusting the bike's setup.",
};

export default <Record<string, HeroTextProps>>{
  default: defaultStub,
  recut: recut,
  withButtons: withButtons,
};
