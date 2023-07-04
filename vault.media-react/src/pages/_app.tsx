import "bootstrap/dist/css/bootstrap.css";

import "@/styles/global/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {}, []);

  return <Component {...pageProps} />;
}
