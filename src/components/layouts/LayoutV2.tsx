import Head from "next/head";

export default function LayoutV2(props) {
  const { children = [] } = props;

  const title = "Drash Land";
  const moduleName = props.topBarModuleName?.toLowerCase() ?? "drash";
  const url = `https://drash.land/${module}`;
  const moduleVersion = props.moduleVersion ?? "";
  const moduleAndVersion = `${module}${
    moduleVersion ? " " + moduleVersion : ""
  }`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content="Drash Land" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta
          property="og:title"
          content={"Drash Land - " + moduleAndVersion}
        />
        <meta
          property="og:description"
          content="Drash Land is a collection of modules for the Deno ecosystem"
        />
        <meta
          property="og:image"
          content={"/logo-" + moduleName + ".svg"}
        />
        <meta name="twitter:card" content="summary_medium_image" />
        <meta name="twitter:domain" content="drash.land" />
        <meta property="twitter:domain" content="drash.land" />
        <meta name="twitter:description" content="" />
        <meta
          name="twitter:title"
          content={"Drash Land - " + moduleAndVersion}
        />
        <meta
          name="twitter:image"
          content={"/logo-" + module + ".svg"}
        />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="600" />
        <meta name="twitter:url" content={url} />
        <meta property="twitter:url" content={url} />
      </Head>
      {children}
    </>
  );
}
