import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script type="text/javascript" src="/assets/js/jquery.js" />
        <script type="text/javascript" src="/assets/js/bootstrap.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
