/* eslint-disable sort-keys */
import ModuleList from 'components/utilities/content-modules/module-list/module-list';

export interface ErrorProps {
  /** The text to show as a headline */
  headline: string;
  /** The rich text to show as a description */
  text?: string;
}

const Error = ({
  headline = "Oops! Looks like we've hit a bump in the road.",
  text = "This page is experiencing a bit of a flat tire, but don't worry, we're working hard to get everything back on track.",
}: ErrorProps) => {
  return (
    <div>
      <ModuleList
        modules={[
          {
            data: {
              color: 'primary',
              headline,
              leadParagraph: text,
              buttonGroup: [
                {
                  link: {
                    linkText: 'Go to homepage',
                    externalLink:
                      'https://www.giant-bicycles.com/global/countryselect',
                  },
                },
              ],
            },
            name: 'Hero',
          },
        ]}
      />
    </div>
  );
};

Error.displayName = 'Error';

export default Error;
