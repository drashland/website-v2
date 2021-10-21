// next.config.js
module.exports = {
  publicRuntimeConfig: {
    versions: {
      drash: {
        versions: [
          // "v1.x", // Uncomment when v1.x docs are migrated
          "v2.x",
        ]
      }
    }
  },
  reactStrictMode: false,
  async redirects() {
    return [
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
    ]
  },
};
