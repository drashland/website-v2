import env from "@/src/env";

export const runtimeConfig = {
  app: {
    env: env("app_env", "production"),
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
    "dmm",
    "drash",
    "line",
    "sinco",
    "wocket",
    "rhum",
    "vital",
  ],
  docDenoLandUrls: {
    dmm: "https://doc.deno.land/https/deno.land/x/dmm/mod.ts",
    drash: "https://doc.deno.land/https/deno.land/x/drash/mod.ts",
    line: "https://doc.deno.land/https/deno.land/x/line/mod.ts",
    rhum: "https://doc.deno.land/https/deno.land/x/rhum/mod.ts",
    sinco: "https://doc.deno.land/https/deno.land/x/sinco/mod.ts",
    wocket: "https://doc.deno.land/https/deno.land/x/wocket/mod.ts",
    vital: "https://doc.deno.land/https/deno.land/x/vital/mod.ts",
  },
  gitHubUrls: {
    dmm: "https://github.com/drashland/dmm",
    drash: "https://github.com/drashland/drash",
    line: "https://github.com/drashland/line",
    sinco: "https://github.com/drashland/sinco",
    rhum: "https://github.com/drashland/rhum",
    wocket: "https://github.com/drashland/wocket",
    website: "https://github.com/drashland/website-v2",
    vital: "https://github.com/drashland/vital",
  },
  roadmapsUrls: { },
  versions: {
    drash: {
      versions: [
        "v1.x",
        "v2.x",
      ],
    },
    line: {
      versions: [
        "v0.x",
        "v1.x",
      ],
    },
    sinco: {
      versions: [
        "v1.x",
        "v2.x",
        "v3.x",
        "v4.x",
      ],
    },
    wocket: {
      versions: [
        "v0.x",
        "v1.x",
      ],
    },
    dmm: {
      versions: [
        "v1.x",
        "v2.x",
      ],
    },
    rhum: {
      versions: [
        "v1.x",
        "v2.x",
      ],
    },
    vital: {
      versions: [
        "v1.x",
      ],
    },
  },
};
