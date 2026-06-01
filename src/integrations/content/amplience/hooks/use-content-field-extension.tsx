import { Body, ContentFieldExtension } from 'dc-extensions-sdk';
import { useEffect, useState } from 'react';
import useExtensionSdk from './use-extension-sdk';

interface ContentFieldExtensionProps<T> {
  onFormChange?: (
    formData: Body<T>,
    extensionSdk: ContentFieldExtension,
  ) => void;
}

const UseContentFieldExtension = <T,>({
  onFormChange,
}: ContentFieldExtensionProps<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState<Body<T>>();
  const {
    extensionSdk,
    isLoading: isLoadingSdk,
    hasError: hasErrorSdk,
  } = useExtensionSdk<ContentFieldExtension>();

  useEffect(() => {
    if (!extensionSdk || formData) return;

    Promise.all([extensionSdk.form.getValue()])
      .then(([initialFormData]) => {
        const initialData = initialFormData as Body<T>;

        setFormData(initialData);
        onFormChange && onFormChange(initialData, extensionSdk);
        extensionSdk.form.onFormValueChange((formModel) => {
          const data = formModel as Body<T>;

          setFormData(data);
          onFormChange && onFormChange(data, extensionSdk);
        });
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [extensionSdk, formData, onFormChange]);

  return {
    formData,
    hasError: hasError || hasErrorSdk,
    isLoading: isLoading || isLoadingSdk,
    ...extensionSdk,
  };
};

export default UseContentFieldExtension;
