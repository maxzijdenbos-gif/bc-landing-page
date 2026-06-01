import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import React from 'react';
import { getAllTabbableElements } from 'libraries/utilities/accessibility/get-all-tabbable-elements';
import styles from './rich-text.module.scss';

// As \\\n is returned from amplience for new lines and markdown does not support this, we need to convert it to <br> tags.
const convertNewLineToBreak = (text: string) => text.replaceAll('\\\n', '<br>');

export interface RichTextProps {
  /** The class name to apply */
  className?: string;
  /** The tabindex for the content within the section */
  tabIndex?: 0 | -1;
  /** The rich text to show */
  text: string;
}

const RichText = ({ className, tabIndex, text, ...rest }: RichTextProps) => {
  const router = useRouter();
  const self = useRef<HTMLDivElement>(null);
  const [tabbableChildren, setTabbableChildren] = useState<HTMLElement[]>([]);

  /** Prevents links in richtext to link out of the site, and use the nextjs router instead. */
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const url = (event.target as HTMLAnchorElement).getAttribute('href');

    if (url && !url.startsWith('http')) {
      event.preventDefault();
      router.push(url);
    }
  };

  useEffect(() => {
    if (!self?.current || tabIndex === undefined) return;
    const tabbableElements = getAllTabbableElements(self.current);

    if (!tabbableChildren?.length) {
      setTabbableChildren(tabbableElements ?? []);
    }

    tabbableChildren?.forEach((element) => {
      element.tabIndex = tabIndex;
    });
    // adding tabbableChildren to the dep array causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, self.current]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={self}
      className={classNames(styles.component, className)}
      onClick={handleClick}
      {...rest}
    >
      <Markdown options={{ forceWrapper: true, wrapper: 'div' }}>
        {convertNewLineToBreak(text)}
      </Markdown>
    </div>
  );
};

RichText.displayName = 'RichText';

export default RichText;
