const path = require("path");
const v2 = require("./next.config.v2.js");
const v3 = require("./next.config.v3.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false, // TODO(crookse) tf is this again? need to research.
  compiler: {
    ...v2.compiler,
  },
  async redirects() {
    return [
      ...v2.redirects,
      {
        source: "/drash",
        destination: "/drash-latest",
        permanent: false,
      },
    ];
  },
  ...v3,
  sassOptions: {
    includePaths: [
      path.join((__dirname, "styles/nextra.scss")),
    ],
  },
};

module.exports = nextConfig;
