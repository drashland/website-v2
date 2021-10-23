// next.config.js
module.exports = {
  publicRuntimeConfig: {
    versions: {
      drash: {
        versions: [
          "v1.x",
          "v2.x",
        ]
      },
      wocket: {
        versions: [
          "v0.x",
        ]
      }
    }
  },
  reactStrictMode: false,
  async redirects() {
    return [
      // Redirect pages without content to the nearest page with content
      {
        source: "/drash/v2.x/getting-started",
        destination: "/drash/v2.x/getting-started/introduction",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials",
        destination: "/drash/v2.x/tutorials/introduction/add-drash-as-a-dependency",
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
    ];
  },
};
