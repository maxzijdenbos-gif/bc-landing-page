import Document, { Head, Html, Main, NextScript } from 'next/document';
import { VWOScript } from 'vwo-smartcode-nextjs';

class CustomDocument extends Document {
  render() {
    const theme = `${process.env.NEXT_PUBLIC_THEME_NAME}`;

    return (
      <Html data-theme={theme}>
        <Head>
          {/* Official documentation implementation */}
          {!!process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID && (
            <VWOScript
              accountId={process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID}
              settingsTimeout={
                process.env.NEXT_PUBLIC_VWO_SETTINGS_TOLERANCE
                  ? parseInt(process.env.NEXT_PUBLIC_VWO_SETTINGS_TOLERANCE, 10)
                  : undefined
              }
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
