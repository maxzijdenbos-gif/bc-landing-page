import Head from 'next/head';
import BCHero from 'components/organisms/bc-hero/bc-hero';
import MainNavigation from 'components/organisms/main-navigation/main-navigation';
import mainNavigationStubs from 'components/organisms/main-navigation/main-navigation.stubs';
import Footer from 'components/organisms/footer/footer';
import footerStubs from 'components/organisms/footer/footer.stubs';
import ModuleAccordion from 'components/organisms/module-accordion/module-accordion';
import ParagraphWithMedia, {
  ParagraphWithMediaProps,
} from 'components/organisms/paragraph-with-media/paragraph-with-media';
import paragraphWithMediaStubs from 'components/organisms/paragraph-with-media/paragraph-with-media.stubs';
import ShopSeries from 'components/organisms/shop-series/shop-series';
import shopSeriesStubs from 'components/organisms/shop-series/shop-series.stubs';
import TeaserList from 'components/organisms/teaser-list/teaser-list';
import { MainNavigationContextProvider } from 'libraries/contexts/main-navigation-context';
import { fontOpenSans } from 'libraries/utilities/global-fonts/open-sans';

const customizationStorySection: ParagraphWithMediaProps = {
  ...paragraphWithMediaStubs.default,
  anchorTarget: 'customization-service',
  backgroundImageObject: {
    alt: 'Bike frame being spray-painted',
    staticSrc: '/images/sections/bc-section-bg.jpg',
  },
  buttonGroup: undefined,
  color: 'secondary',
  foregroundMedia: [
    {
      image: {
        alt: 'Custom blue Giant bike frame',
        staticSrc: '/images/sections/bc-section-fg.jpg',
      },
      type: 'image',
    },
  ],
  mediaPlacement: 'Right',
  paragraphText:
    "With Giant's Customization Service, create a bike that feels unmistakably yours. Choose the paint finish, tune the core components, and shape every detail into a ride that reflects your style before the first pedal stroke.",
  title: 'Your bike, built around you',
};

export default function LandingPage() {
  return (
    <div className={fontOpenSans.variable} data-nav-color="secondary">
      <MainNavigationContextProvider>
        <Head>
          <title>Giant – Landing Page</title>
          <meta name="description" content="Giant Bicycles landing page" />
        </Head>

        <MainNavigation {...mainNavigationStubs.default} />

        <BCHero
          anchorList={[
            {
              anchorTarget: 'how-it-works',
              anchorTitle: 'How it works',
            },
            {
              anchorTarget: 'shop-series',
              anchorTitle: 'Start customizing',
            },
            {
              anchorTarget: 'faq',
              anchorTitle: 'FAQ',
            },
          ]}
        />
        <ParagraphWithMedia {...customizationStorySection} />
        <TeaserList
          anchorTarget="how-it-works"
          color="secondary"
          displayMode="slide"
          hideArrows
          nonInteractive
          title="Easily build your dream bike"
          teaserElements={[
            {
              teaserType: 'content',
              imageObject: { alt: 'Choose the model and the groupset', staticSrc: '/images/teaser/1.png' },
              link: [{ internalLink: '#', linkText: 'Choose the model and the groupset', target: '_self' }],
              teaserHeadline: 'Choose the model and the groupset',
              teaserTags: ['Step 1'],
            },
            {
              teaserType: 'content',
              imageObject: { alt: 'Choose colors & components', staticSrc: '/images/teaser/2.png' },
              link: [{ internalLink: '#', linkText: 'Choose colors & components', target: '_self' }],
              teaserHeadline: 'Choose colors & components',
              teaserTags: ['Step 2'],
            },
            {
              teaserType: 'content',
              imageObject: { alt: 'Confirm at the store', staticSrc: '/images/teaser/3.png' },
              link: [{ internalLink: '#', linkText: 'Confirm at the store', target: '_self' }],
              teaserHeadline: 'Confirm at the store',
              teaserTags: ['Step 3'],
            },
            {
              teaserType: 'content',
              imageObject: { alt: 'Pick up at the store', staticSrc: '/images/teaser/4.png' },
              link: [{ internalLink: '#', linkText: 'Pick up at the store', target: '_self' }],
              teaserHeadline: 'Pick up at the store',
              teaserTags: ['Step 4'],
            },
          ]}
        />
        <ShopSeries
          anchor
          anchorTarget="shop-series"
          color="secondary"
          seriesElements={[
            {
              ...shopSeriesStubs.default.seriesElements[0],
              fromPrice: '$12,750',
              imageObject: { alt: 'TCR bike', staticSrc: '/images/bikes/TCR.png' },
              modalBikes: [
                {
                  fromPrice: 'NT$258,000',
                  imageObject: { alt: 'TCR Advanced SL', staticSrc: '/images/modal/TCR-SL.png' },
                  link: 'https://www.giant-bicycles.com/us/tcr-advanced-sl',
                  name: 'TCR Advanced SL',
                },
                {
                  fromPrice: 'NT$199,800',
                  imageObject: { alt: 'TCR Advanced Pro', staticSrc: '/images/modal/TCR-PRO.png' },
                  link: 'https://www.giant-bicycles.com/us/tcr-advanced-pro',
                  name: 'TCR Advanced Pro',
                },
              ],
              modalFrameBike: {
                fromPrice: 'NT$258,000',
                imageObject: { alt: 'TCR Advanced SL Frame', staticSrc: '/images/modal/TCR-FRAME.png' },
                link: 'https://www.giant-bicycles.com/us/tcr-advanced-sl-frame',
                name: 'TCR Advanced SL',
              },
              seriesDescription:
                'Built for riders who want it all, the TCR combines explosive climbing with razor-sharp handling. The ultimate all-round race machine for every terrain.',
              seriesName: 'TCR',
            },
            {
              ...shopSeriesStubs.default.seriesElements[0],
              fromPrice: '$12,750',
              imageObject: { alt: 'Propel bike', staticSrc: '/images/bikes/PROPEL.png' },
              modalBikes: [
                {
                  fromPrice: 'NT$258,000',
                  imageObject: { alt: 'Propel Advanced SL', staticSrc: '/images/modal/PROPEL-SL.png' },
                  link: 'https://www.giant-bicycles.com/us/propel-advanced-sl',
                  name: 'Propel Advanced SL',
                },
                {
                  fromPrice: 'NT$199,800',
                  imageObject: { alt: 'Propel Advanced Pro', staticSrc: '/images/modal/PROPEL-PRO.png' },
                  link: 'https://www.giant-bicycles.com/us/propel-advanced-pro',
                  name: 'Propel Advanced Pro',
                },
              ],
              modalFrameBike: {
                fromPrice: 'NT$258,000',
                imageObject: { alt: 'Propel Advanced SL Frame', staticSrc: '/images/modal/PROPEL-FRAME.png' },
                link: 'https://www.giant-bicycles.com/us/propel-advanced-sl-frame',
                name: 'Propel Advanced SL',
              },
              seriesDescription:
                'Engineered for pure speed, the Propel delivers uncompromising aero performance. Built to dominate sprints, flats, and high-speed attacks.',
              seriesName: 'PROPEL',
            },
            {
              ...shopSeriesStubs.default.seriesElements[0],
              fromPrice: '$12,750',
              imageObject: { alt: 'Defy bike', staticSrc: '/images/bikes/DEFY.png' },
              modalBikes: [
                {
                  fromPrice: 'NT$258,000',
                  imageObject: { alt: 'Defy Advanced SL', staticSrc: '/images/modal/DEFY-SL.png' },
                  link: 'https://www.giant-bicycles.com/us/defy-advanced-sl',
                  name: 'Defy Advanced SL',
                },
                {
                  fromPrice: 'NT$199,800',
                  imageObject: { alt: 'Defy Advanced Pro', staticSrc: '/images/modal/DEFY-PRO.png' },
                  link: 'https://www.giant-bicycles.com/us/defy-advanced-pro',
                  name: 'Defy Advanced Pro',
                },
              ],
              modalFrameBike: {
                fromPrice: 'NT$258,000',
                imageObject: { alt: 'Defy Advanced SL Frame', staticSrc: '/images/modal/DEFY-FRAME.png' },
                link: 'https://www.giant-bicycles.com/us/defy-advanced-sl-frame',
                name: 'Defy Advanced SL',
              },
              seriesDescription:
                'The Defy combines endurance comfort with responsive road performance. Smooth, confident, and ready for long days in the saddle.',
              seriesName: 'DEFY',
            },
            {
              ...shopSeriesStubs.default.seriesElements[0],
              fromPrice: '$12,750',
              imageObject: { alt: 'Trinity bike', staticSrc: '/images/bikes/TRINITY.png' },
              modalBikes: [
                {
                  fromPrice: 'NT$258,000',
                  imageObject: { alt: 'Trinity Advanced SL', staticSrc: '/images/modal/TRINITY.png' },
                  link: 'https://www.giant-bicycles.com/us/trinity-advanced-sl',
                  name: 'Trinity Advanced SL',
                },
              ],
              modalFrameBike: {
                fromPrice: 'NT$258,000',
                imageObject: { alt: 'Trinity Advanced SL Frame', staticSrc: '/images/modal/TRINITY-FRAME.png' },
                link: 'https://www.giant-bicycles.com/us/trinity-advanced-sl-frame',
                name: 'Trinity Advanced SL',
              },
              seriesDescription:
                'Designed for maximum aerodynamic efficiency, the Trinity is built to perform against the clock. Elite speed meets integrated precision.',
              seriesName: 'TRINITY',
            },
            {
              ...shopSeriesStubs.default.seriesElements[0],
              fromPrice: '$12,750',
              imageObject: { alt: 'Langma bike', staticSrc: '/images/bikes/LANGMA.png' },
              modalBikes: [
                {
                  fromPrice: 'NT$258,000',
                  imageObject: { alt: 'Langma Advanced SL', staticSrc: '/images/modal/LANGMA-SL.png' },
                  link: 'https://www.giant-bicycles.com/us/langma-advanced-sl',
                  name: 'Langma Advanced SL',
                },
                {
                  fromPrice: 'NT$199,800',
                  imageObject: { alt: 'Langma Advanced Pro', staticSrc: '/images/modal/LANGMA-PRO.png' },
                  link: 'https://www.giant-bicycles.com/us/langma-advanced-pro',
                  name: 'Langma Advanced Pro',
                },
              ],
              modalFrameBike: {
                fromPrice: 'NT$258,000',
                imageObject: { alt: 'Langma Advanced SL Frame', staticSrc: '/images/modal/LANGMA-FRAME.png' },
                link: 'https://www.giant-bicycles.com/us/langma-advanced-sl-frame',
                name: 'Langma Advanced SL',
              },
              seriesDescription:
                'Lightweight, agile, and race-focused, the Langma thrives on climbs and fast accelerations. A true all-round performance bike.',
              seriesName: 'LANGMA',
            },
          ]}
        />
        <TeaserList
          color="secondary"
          displayMode="slide"
          hideArrows
          nonInteractive
          title="Ride yours. Share yours."
          teaserElements={[
            {
              teaserType: 'social',
              imageObject: { alt: 'Cyclist with custom Giant bike', staticSrc: '/images/social/1.png' },
              link: 'https://instagram.com',
              socialMediaIcon: 'Instagram',
              teaserHeadline: '@devin_debruhl',
            },
            {
              teaserType: 'social',
              imageObject: { alt: 'Rider on custom Propel', staticSrc: '/images/social/2.png' },
              link: 'https://instagram.com',
              socialMediaIcon: 'Instagram',
              teaserHeadline: '@reece_wallace',
            },
            {
              teaserType: 'social',
              imageObject: { alt: 'Custom Defy on the road', staticSrc: '/images/social/3.png' },
              link: 'https://instagram.com',
              socialMediaIcon: 'Instagram',
              teaserHeadline: '@youndeniaud',
            },
            {
              teaserType: 'social',
              imageObject: { alt: 'Trinity in action', staticSrc: '/images/social/4.png' },
              link: 'https://instagram.com',
              socialMediaIcon: 'Instagram',
              teaserHeadline: '@remithirion',
            },
          ]}
        />
        <ModuleAccordion
          anchorTarget="faq"
          color="secondary"
          headline="Frequently asked questions"
          items={[
            {
              title: 'What is the Giant Customization Service?',
              richText:
                "Giant's Customization Service lets you build a road bike tailored to your exact preferences — from frame model and groupset to paint finish and key components. You design it online and finalize everything in-store with a Giant dealer.",
            },
            {
              title: 'Which bike models are available for customization?',
              richText:
                'The Customization Service covers our core road lineup: the TCR, Propel, Defy, Trinity, and Langma. Each model is available in a range of configurations so you can match the bike to your riding style and goals.',
            },
            {
              title: 'How long does it take to receive my custom bike?',
              richText:
                'Lead times vary by configuration and availability, but most custom builds are ready for pickup within 6 to 10 weeks after your order is confirmed in-store. Your dealer will give you a precise estimate at the time of order.',
            },
            {
              title: 'Can I change my order after it has been placed?',
              richText:
                'Changes can typically be made within 48 hours of placing your order. After that, the build process may have already started. Contact your Giant dealer as soon as possible if you need to make adjustments.',
            },
            {
              title: 'What is included in the base price?',
              richText:
                'The listed price includes the complete bike as configured — frame, groupset, cockpit, and wheels. Any additional upgrades or accessories selected during the customization process will be reflected in the final quote you receive in-store.',
            },
            {
              title: 'Is the Customization Service available worldwide?',
              richText:
                'The service is available through participating Giant dealers in select markets. Use the dealer locator on giant-bicycles.com to find a Customization Service partner near you.',
            },
          ]}
        />
        <Footer
          {...footerStubs.default}
          copyrightText="Copyright © {{year}} Giant. All rights reserved."
          languageLink={{
            iconClass: 'World_24',
            link: [{ externalLink: 'https://www.giant-bicycles.com/global/countryselect', linkText: 'Link to language page', target: '_self' }],
            selectedLanguage: 'USA',
          }}
          socialMediaLinks={[
            { iconClass: 'FacebookCircle', link: [{ externalLink: 'https://facebook.com', linkText: 'Facebook', target: '_blank' }] },
            { iconClass: 'Youtube', link: [{ externalLink: 'https://youtube.com', linkText: 'Youtube', target: '_blank' }] },
            { iconClass: 'Instagram', link: [{ externalLink: 'https://instagram.com', linkText: 'Instagram', target: '_blank' }] },
            { iconClass: 'Strava', link: [{ externalLink: 'https://strava.com', linkText: 'Strava', target: '_blank' }] },
          ]}
          linkColumns={[
            {
              header: 'Support',
              links: [
                { externalLink: '#', linkText: 'Customer support', target: '_self' },
                { externalLink: '#', linkText: 'Warranty Policy', target: '_self' },
                { externalLink: '#', linkText: 'Online Return policy', target: '_self' },
                { externalLink: '#', linkText: 'Financing', target: '_self' },
                { externalLink: '#', linkText: 'Home Delivery Service', target: '_self' },
                { externalLink: '#', linkText: 'E-Bike Tampering Policy', target: '_self' },
                { externalLink: '#', linkText: 'Recall Information', target: '_self' },
                { externalLink: 'https://www.giant-bicycles.com/us/contact#', linkText: 'Contact Us', target: '_blank' },
              ],
            },
            {
              header: 'Resources',
              links: [
                { externalLink: '#', linkText: 'Find A Giant Retailer', target: '_self' },
                { externalLink: '#', linkText: 'Bike Archive', target: '_self' },
                { externalLink: '#', linkText: 'Bike Registration', target: '_self' },
                { externalLink: '#', linkText: 'Product Manuals', target: '_self' },
                { externalLink: 'https://www.giant-bicycles.com/us/composite-confidence', linkText: 'Composite Confidence', target: '_blank' },
                { externalLink: '#', linkText: 'Tire Pressure Calculator', target: '_self' },
                { externalLink: '#', linkText: 'RideLink App', target: '_self' },
              ],
            },
            {
              header: 'Features',
              links: [
                { externalLink: '#', linkText: 'News', target: '_self' },
                { externalLink: '#', linkText: 'Events', target: '_self' },
                { externalLink: '#', linkText: 'Technology', target: '_self' },
                { externalLink: '#', linkText: 'Teams & Riders', target: '_self' },
              ],
            },
            {
              header: 'Company',
              links: [
                { externalLink: '#', linkText: 'About Giant', target: '_self' },
                { externalLink: '#', linkText: 'Advocacy', target: '_self' },
                { externalLink: '#', linkText: 'Privacy Policy', target: '_self' },
                { externalLink: '#', linkText: 'About Cookies', target: '_self' },
                { externalLink: '#', linkText: 'Accessibility', target: '_self' },
                { externalLink: '#', linkText: 'Careers at Giant', target: '_self' },
                { externalLink: '#', linkText: 'Terms & Conditions', target: '_self' },
                { externalLink: '#', linkText: 'Transparency in Coverage Rule', target: '_self' },
              ],
            },
          ]}
        />
      </MainNavigationContextProvider>
    </div>
  );
}
