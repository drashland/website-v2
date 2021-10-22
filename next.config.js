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
      sinco: {
        versions: [
          "v2.x"
        ]
      }
    }
  },
  reactStrictMode: false,
};
