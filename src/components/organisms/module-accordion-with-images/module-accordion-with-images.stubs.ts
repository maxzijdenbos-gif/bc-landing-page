import imageStubs from 'components/atoms/image/image.stubs';
import { ModuleAccordionWithImagesProps } from './module-accordion-with-images';

const defaultStub: ModuleAccordionWithImagesProps = {
  imageStack: [
    {
      imageObject: imageStubs.default.imageObject,
      isActive: true,
      link: [
        {
          internalLink: '/guides/skills-needed-as-a-mountain-biker',
          internalLinkRef: [
            {
              _meta: {
                schema:
                  'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
              },
              contentType: 'https://giant.com/pages/GenericPage',
              id: 'a67f292f-f84c-4311-8922-d9d24f966632',
            },
          ],
          linkText: 'Read more',
          target: '_self',
        },
      ],
      text: `
## This is a subheadline
This is a newline
1. bullet
2. is
3. here
      `,
      title: 'Item without defined ID',
    },
    {
      imageObject: imageStubs.default.imageObject,
      isActive: false,
      text: 'There are no subheadlines here. Just text!',
      title: 'Item with a custom id',
    },
  ],
  title: 'Accordion to lorem ipsum',
};

export default <Record<string, ModuleAccordionWithImagesProps>>{
  default: defaultStub,
};
