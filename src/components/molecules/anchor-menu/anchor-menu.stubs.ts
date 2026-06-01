import { AnchorMenuProps } from './anchor-menu';

const defaultStub: AnchorMenuProps = {
  anchorList: [
    {
      anchorTarget: 'a-read-more',
      anchorTitle: 'Read more',
    },
    {
      anchorTarget: 'b-watch-video',
      anchorTitle: 'Watch video',
    },
  ],
};

const largeListStub: AnchorMenuProps = {
  anchorList: [
    ...defaultStub.anchorList,
    {
      anchorTarget: 'c-learn-more',
      anchorTitle: 'Learn more',
    },
    {
      anchorTarget: 'd-contact-support',
      anchorTitle: 'Contact support',
    },
    {
      anchorTarget: 'e-terms',
      anchorTitle: 'Terms & conditions',
    },
    {
      anchorTarget: 'f-privacy-policy',
      anchorTitle: 'Privacy policy',
    },
    {
      anchorTarget: 'g-features',
      anchorTitle: 'Features',
    },
    {
      anchorTarget: 'h-pricing',
      anchorTitle: 'Pricing',
    },
    {
      anchorTarget: 'i-testimonials',
      anchorTitle: 'Testimonials',
    },
    {
      anchorTarget: 'j-faq',
      anchorTitle: 'FAQ',
    },
    {
      anchorTarget: 'k-download',
      anchorTitle: 'Download',
    },
  ],
};

export default <Record<string, AnchorMenuProps>>{
  default: defaultStub,
  largeList: largeListStub,
};
