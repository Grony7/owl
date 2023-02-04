import '../styles/globals.css';
import {AppProps} from "next/app";
import Head from 'next/head';

export default function App({Component, pageProps}: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Owl</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
