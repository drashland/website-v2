import "../styles/globals.css";
import "../public/prism.css";
import "../public/prism.js";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const title = "Drash Land";
  const module = pageProps.topBarModuleName?.toLowerCase() ?? "drash";
  const url = `https://drash.land/${module}`;
  const moduleVersion = pageProps.moduleVersion ?? '';
  const moduleAndVersion = `${module}${moduleVersion ? " " + moduleVersion : ''}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content="Drash Land" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={"Drash Land - " + moduleAndVersion} />
        <meta
          property="og:description"
          content="Drash Land is a collection of modules for the Deno ecosystem"
        />
        <meta property="og:image" content={"https://raw.githubusercontent.com/drashland/website-v2/main/public/logo-" + module + ".svg"} />
        <meta name="twitter:card" content="summary_medium_image" />
        <meta name="twitter:domain" content="drash.land" />
        <meta property="twitter:domain" content="drash.land" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:title" content={"Drash Land - " + moduleAndVersion} />
        <meta name="twitter:image" content={"https://raw.githubusercontent.com/drashland/website-v2/main/public/logo-" + module + ".svg"} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="600" />
        <meta name="twitter:url" content={url} />
        <meta property="twitter:url" content={url} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
