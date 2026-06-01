import classNames from 'classnames';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import React from 'react';
import slugify from 'slugify';
import Image from 'components/atoms/image/image';
import RichText from 'components/atoms/rich-text/rich-text';
import Typography from 'components/atoms/typography/typography';
import Accordion from 'components/molecules/accordion/accordion';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import ParallaxWrapper from 'components/utilities/parallax-wrapper/parallax-wrapper';
import Row from 'components/utilities/row/row';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { getImageObjectUrl } from 'libraries/utilities/social-meta-tags';
import StackedCards from './stacked-cards/stacked-cards';
import styles from './module-accordion-with-images.module.scss';

const IMAGE_SIZE = 500;
const IMAGE_STYLE = { maxWidth: `${IMAGE_SIZE}px` } as CSSProperties;

interface ImageStackItemProps {
  imageObject?: AmplienceImagePayload;
  isActive: boolean;
  link?: BaseLink[];
  text?: string;
  title: string;
}

export interface ModuleAccordionWithImagesProps extends ModuleWrapperProps {
  imageStack?: ImageStackItemProps[];
  title?: string;
}

const ModuleAccordionImageContent = ({
  imageObject,
  isActive,
  link,
  text,
}: ImageStackItemProps) => {
  return (
    <React.Fragment>
      {text && <RichText text={text} />}
      {link?.[0] && (
        <Button
          className={styles.link}
          doUnderline
          link={link?.[0]}
          tabIndex={isActive ? 0 : -1}
          text={link?.[0].linkText}
          variant="Text"
        />
      )}
      <Image
        alt={imageObject?.alt || ''}
        className={classNames(styles.image, styles.isContent)}
        height={IMAGE_SIZE}
        src={getImageObjectUrl(imageObject, IMAGE_SIZE * 2, IMAGE_SIZE * 2)}
        style={IMAGE_STYLE}
        width={IMAGE_SIZE}
      />
    </React.Fragment>
  );
};

const ModuleAccordionWithImages = ({
  anchorTarget,
  imageStack = [],
  title,
}: ModuleAccordionWithImagesProps) => {
  const [activeChild, setActiveChild] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const firstChild = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      ref.current?.setAttribute(
        'style',
        `height: ${Math.min(
          IMAGE_SIZE,
          firstChild.current?.clientHeight || IMAGE_SIZE,
        )}px`,
      );
    };

    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => {
      window?.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <ModuleWrapper
      anchorTarget={anchorTarget}
      className={styles.component}
      color={'primary'}
    >
      <Container>
        <Row className={styles.row}>
          <Column
            className={styles.hideOnMobile}
            width={{ smallLaptop: 5, tablet: 5 }}
          >
            <ParallaxWrapper
              minOpacity={0}
              observerOffset={'startEndStartCenter'}
              translateYStartEnd={'15vhTo0vh'}
            >
              <div ref={ref}>
                <StackedCards
                  activeChild={activeChild}
                  className={styles.cardsWrapper}
                >
                  {imageStack.map(({ imageObject }, index) => (
                    <Image
                      key={index}
                      ref={index === 0 ? firstChild : undefined}
                      alt={imageObject?.alt || ''}
                      className={styles.image}
                      height={IMAGE_SIZE}
                      src={getImageObjectUrl(
                        imageObject,
                        IMAGE_SIZE * 2,
                        IMAGE_SIZE * 2,
                      )}
                      style={IMAGE_STYLE}
                      width={IMAGE_SIZE}
                    />
                  ))}
                </StackedCards>
              </div>
            </ParallaxWrapper>
          </Column>
          <Column
            offset={{ smallLaptop: 1, tablet: 0 }}
            width={{ smallLaptop: 5, tablet: 12 }}
          >
            <ParallaxWrapper
              minOpacity={0}
              observerOffset={'startEndStartCenter'}
              translateYStartEnd={'15vhTo0vh'}
            >
              {title && (
                <Typography
                  className={styles.title}
                  tag={'h2'}
                  tagStyle="displaySmall"
                  weight="heavy"
                >
                  {title}
                </Typography>
              )}
              <Accordion>
                {imageStack.map((imageProps, index) => (
                  <Accordion.AccordionItem
                    key={`${slugify(imageProps?.title ?? '')}-${index}`}
                    disableToggle={index === activeChild}
                    isActive={index === activeChild}
                    onToggle={() => {
                      setActiveChild(index);
                    }}
                    title={imageProps.title}
                  >
                    <ModuleAccordionImageContent
                      {...imageProps}
                      isActive={index === activeChild}
                    />
                  </Accordion.AccordionItem>
                ))}
              </Accordion>
            </ParallaxWrapper>
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

ModuleAccordionWithImages.displayName = 'ModuleAccordionWithImages';

export default ModuleAccordionWithImages;
