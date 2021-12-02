import "../styles/globals.css";
import "../public/prism.css";
import "../public/prism.js";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Drash Land</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
