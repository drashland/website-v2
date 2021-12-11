// next.config.js
module.exports = {
  publicRuntimeConfig: {
    app: {
      env: process.APP_ENV || "production",
    },
    localStorageKeys: {
      darkMode: "drash_land_dark_mode",
    },
    // A list of modules that have been migrated over to Next.js. This is used
    // in the `[...path_params].js` file. If documentation pages for a module
    // are requested, then `[...path_params].js` will check to see if that
    // module is listed here and will do one of the following:
    //
    //   - If the module is not listed here, then Next.js will end up showing
    //     the 404 page.
    //   - If the module is listed here, then Next.js will redirect the user to:
    //         /{module}/{version}/getting-started/introduction
    //   - If a module is listed here AND is set to redirect (see the
    //     `redirects` config down below), then Next.js will redirect the user
    //     using the `destination` in the `redirects` config.
    modules: [
      "drash",
      "sinco",
    ],
    docDenoLandUrls: {
      dmm: "https://doc.deno.land/https/deno.land/x/dmm/mod.ts",
      drash: "https://doc.deno.land/https/deno.land/x/drash/mod.ts",
      line: "https://doc.deno.land/https/deno.land/x/line/mod.ts",
      rhum: "https://doc.deno.land/https/deno.land/x/rhum/mod.ts",
      sinco: "https://doc.deno.land/https/deno.land/x/sinco/mod.ts",
      wocket: "https://doc.deno.land/https/deno.land/x/wocket/mod.ts",
    },
    gitHubUrls: {
      dmm: "https://github.com/drashland/dmm",
      drash: "https://github.com/drashland/drash",
      line: "https://github.com/drashland/line",
      sinco: "https://github.com/drashland/sinco",
      rhum: "https://github.com/drashland/rhum",
      wocket: "https://github.com/drashland/wocket",
      website: "https://github.com/drashland/website-v2",
    },
    roadmapsUrls: {
      drash:
        "https://github.com/drashland/drash/issues?q=is%3Aissue+is%3Aopen+roadmap",
    },
    versions: {
      drash: {
        versions: [
          "v1.x",
          "v2.x",
        ],
      },
      sinco: {
        versions: [
          "v1.x",
          "v2.x",
          "v3.x",
        ],
      },
      wocket: {
        versions: [
          "v0.x",
        ],
      },
    },
  },
  reactStrictMode: false,
  redirects() {
    return [
      // Redirect pages without content to the nearest page with content
      {
        source: "/drash/v2.x/getting-started",
        destination: "/drash/v2.x/getting-started/introduction",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials",
        destination:
          "/drash/v2.x/tutorials/introduction/add-drash-as-a-dependency",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/resources",
        destination: "/drash/v2.x/tutorials/resources/creating-a-resource",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/requests",
        destination: "/drash/v2.x/tutorials/requests/handling-json-bodies",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/responses",
        destination: "/drash/v2.x/tutorials/responses/setting-the-body",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/services",
        destination: "/drash/v2.x/tutorials/services/introduction",
        permanent: false,
      },
      // Remove the below /drash/v1.x object when its migrated
      {
        source: "/drash/v1.x",
        destination: "/drash/v1.x/index.html",
        permanent: false,
      },
      // Remove the below /wocket object when the its migrated
      {
        source: "/wocket",
        destination: "/wocket/v0.x/index.html",
        permanent: false,
      },
      {
        source: "/wocket/v0.x",
        destination: "/wocket/v0.x/index.html",
        permanent: false,
      },
      // Remove the below /dmm object when the its migrated
      {
        source: "/dmm",
        destination: "/dmm/v1.x/index.html",
        permanent: false,
      },
      {
        source: "/dmm/v1.x",
        destination: "/dmm/v1.x/index.html",
        permanent: false,
      },
      // Remove the below /rhum object when the its migrated
      {
        source: "/rhum",
        destination: "/rhum/v1.x/index.html",
        permanent: false,
      },
      {
        source: "/rhum/v1.x",
        destination: "/rhum/v1.x/index.html",
        permanent: false,
      },
      // Remove the below /line object when the its migrated
      {
        source: "/line",
        destination: "/line/v0.x/index.html",
        permanent: false,
      },
      {
        source: "/line/v0.x",
        destination: "/line/v0.x/index.html",
        permanent: false,
      },
      // Remove the below /sinco object when the its migrated
      {
        source: "/sinco/v1.x",
        destination: "/sinco/v1.x/index.html",
        permanent: false,
      },
    ];
  },
};
