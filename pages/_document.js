import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="Nexus TechHub" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Nexus TechHub" />
          <meta name="description" content="Premium mobile device parts and repair solutions in UAE" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#20b2aa" />

          <link rel="apple-touch-icon" href="/icons/mdts-icon.svg" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/icons/mdts-icon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
