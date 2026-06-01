import { useRef, useState } from 'react';
import React from 'react';
import UseContentFieldExtension from 'integrations/content/amplience/hooks/use-content-field-extension';
import { AmplienceImagePayload } from 'integrations/content/amplience/types/content-types';
import withIframeRestriction from 'libraries/hocs/with-iframe-restriction';

const ImageDimensions = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const controller = useRef(new AbortController());
  const isFetching = useRef(false);
  const cacheRef = useRef<Map<string, { height: number; width: number }>>(
    new Map(),
  );
  const { isLoading, hasError: hasExtensionError } = UseContentFieldExtension<{
    backgroundImageObject?: AmplienceImagePayload;
    foregroundImageObject?: AmplienceImagePayload;
    imageObject?: AmplienceImagePayload;
  }>({
    onFormChange: async (form, { field, frame }) => {
      const imageObject =
        form?.imageObject ||
        form?.media?.[0]?.image ||
        form?.foregroundImageObject ||
        form?.foregroundMedia?.[0]?.image ||
        form?.backgroundImageObject;
      const dimage = imageObject?.diImage;

      if (!dimage?.image) {
        frame.setHeight(21);
        setErrorMessage('No image provided');

        return;
      }

      const saveField = (width: number, height: number) => {
        const formWidth = imageObject?.dimensions?.width;
        const formHeight = imageObject?.dimensions?.height;

        if (formWidth !== width || formHeight !== height) {
          field.setValue({ height, width });
        }

        setHeight(height);
        setWidth(width);
      };

      frame.setHeight(42);

      const cropWidth = dimage.crop?.[2];
      const cropHeight = dimage.crop?.[3];

      if (cropWidth && cropHeight) {
        return saveField(cropWidth, cropHeight);
      }

      const cacheKey = `${dimage.image.endpoint}/${dimage.image.name}`;
      const cached = cacheRef.current.get(cacheKey);

      if (cached) {
        return saveField(cached.width, cached.height);
      }

      if (isFetching.current) controller.current.abort();

      isFetching.current = true;
      const url = `https://${dimage.image.defaultHost}/i/${cacheKey}.json`;

      fetch(url, { signal: controller.current.signal })
        .then((response) => response.json())
        .then(({ height, width }) => {
          cacheRef.current.set(cacheKey, { height, width });
          saveField(width, height);
        })
        .catch((error) => {
          if (error?.name !== 'AbortError') {
            setErrorMessage('Error retrieving from Media API');
          }
        })
        .finally(() => {
          isFetching.current = false;
        });

      // Clear error (if any)
      setErrorMessage('');
    },
  });

  if (isLoading) return 'Loading';
  if (hasExtensionError) return 'Something went wrong';
  if (errorMessage) return errorMessage;

  return (
    <React.Fragment>
      <div>
        <b>Width: </b>
        {width}
      </div>
      <div>
        <b>Height: </b>
        {height}
      </div>
    </React.Fragment>
  );
};

export default withIframeRestriction(ImageDimensions);
