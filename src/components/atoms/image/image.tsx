import classNames from 'classnames';
import { Image as ImageConstructor, ImageUrlBuilder } from 'dc-delivery-sdk-js';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useRouter } from 'next/router';
import { forwardRef, Ref, useState } from 'react';
import { ModuleWrapperProps } from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import { fixSafariImage } from '../../../utils/safariImage';
import styles from './image.module.scss';

const DEFAULT_MAX_WIDTH = 1920 * 2; // double dpi for our max screen

export type ImageProps = {
  fallbackSrc?: string;
  imageObject?: AmplienceImagePayload;
  imageObjectMobile?: AmplienceImagePayload;
  /* Use this prop to pass the max width of the image when used with fill property to limit the initial image size. Will be multiplied by 2 for double dpi */
  maxFillWidth?: number;
  onErrorCallback?: () => void;
} & Partial<NextImageProps> &
  Partial<ModuleWrapperProps>;

const getFocalPoint = (imageObject?: AmplienceImagePayload) => {
  const { x, y } = imageObject?.diImage?.poi ?? {};

  if (!x || !y) return {};
  if (x <= 0 || y <= 0) return {};

  return {
    objectPosition: `${+x * 100}% ${+y * 100}%`,
  };
};

const Image = forwardRef(
  (
    {
      alt = '',
      className,
      fallbackSrc,
      fill,
      maxFillWidth,
      imageObject,
      onErrorCallback,
      onLoad,
      quality = 80,
      src = '',
      style,
      ...rest
    }: ImageProps,
    ref: Ref<HTMLImageElement | null> | undefined,
  ) => {
    const { basePath } = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const handleLoadingComplete = () => {
      setIsLoading(false);
    };

    // ImageObject should not be returned without image property,
    if (!imageObject?.diImage?.image && !imageObject?.staticSrc && !src) return null;

    const srcString = (() => {
      if (imageObject?.staticSrc) return imageObject.staticSrc;

      const dimage = imageObject?.diImage;

      if (dimage?.image) {
        const width =
          rest.width ?? (maxFillWidth ? maxFillWidth * 2 : DEFAULT_MAX_WIDTH);
        const qualityNumber = parseInt(`${quality}`);

        const image = new ImageConstructor(dimage.image, {});

        const baseImage = new ImageUrlBuilder(image)
          .host(dimage.image.defaultHost)
          .quality(qualityNumber);

        if (width) {
          baseImage.width(parseInt(`${width}`));
        }

        const baseImageSrc = baseImage.build();
        const finalUrl = dimage.query
          ? `${baseImageSrc}&${dimage.query}`
          : baseImageSrc;

        return fixSafariImage(finalUrl);
      }

      return fixSafariImage(typeof src === 'string' ? src : '');
    })();

    const styleObject = () => {
      if (imageObject) {
        return { ...style, ...getFocalPoint(imageObject) };
      }

      return style;
    };

    // Ensure proper sizes attribute for Safari
    const imageSizes =
      rest.sizes || (fill ? '(min-width: 1024px) 800px, 100vw' : undefined);
    const withBasePath = (path: string) =>
      path.startsWith('/') && !path.startsWith('//')
        ? `${basePath}${path}`
        : path;

    const finalSrc = withBasePath(
      isError || !srcString
        ? fixSafariImage(fallbackSrc || srcString || '')
        : srcString,
    );

    return (
      <NextImage
        {...rest}
        ref={ref}
        alt={alt}
        className={classNames(styles.component, className, {
          [styles.isLoading]: isLoading,
        })}
        fill={fill}
        onError={() => {
          setIsError(true);
          setIsLoading(true);
          onErrorCallback && onErrorCallback();
        }}
        onLoad={(event) => {
          handleLoadingComplete();
          onLoad && onLoad(event);
        }}
        quality={quality}
        sizes={imageSizes}
        src={finalSrc}
        style={styleObject()}
      />
    );
  },
);

Image.displayName = 'Image';

export default Image;
