/**
 * @type {import("nextra").Nextra}
 */
const nextra = require("nextra");

const withNextra = nextra({
  theme: "./src/components/layouts/LayoutV3.tsx",
  themeConfig: "./next.config.v3.theme.tsx",
});

module.exports = withNextra();
