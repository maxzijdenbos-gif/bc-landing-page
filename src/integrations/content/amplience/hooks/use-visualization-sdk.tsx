import { init } from 'dc-visualization-sdk';
import { useEffect, useState } from 'react';

// !Note: Current visualization only works in the iframe mode and not as a pop out window
// Documented here: https://amplience.com/developers/docs/dev-tools/guides-tutorials/visualizations/#visualization-sdk-usage-notes
// Time of documentation: 24/05/24

const useVisualizationSDK = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<Record<string, any>>();
  const [locale, setLocale] = useState<string | null>();

  useEffect(() => {
    const sdkCall = async () => {
      try {
        setIsLoading(true);

        const sdk = await init();
        const initialFormData = await sdk.form.get();
        const locale = await sdk.locale.get();

        setLocale(locale);
        sdk.form.changed(setData);
        setData(initialFormData);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void sdkCall();
  }, []);

  return {
    data,
    hasError,
    isLoading,
    locale,
  };
};

export default useVisualizationSDK;
