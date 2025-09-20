import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* Preload critical fonts */}
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />

          {/* Favicon and app icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Theme color for mobile browsers */}
          <meta name="theme-color" content="#10b981" />
          <meta name="msapplication-TileColor" content="#10b981" />

          {/* Open Graph meta tags for social sharing */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Nexus Tech Hub" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter Card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@nexustechhub" />

          {/* Additional meta tags for SEO and accessibility */}
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Nexus Tech Hub" />
          <meta name="format-detection" content="telephone=no" />

          {/* Canonical URL will be set by individual pages */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
