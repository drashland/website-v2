import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import Image from "next/image";

/**
 * Theme Configuration docs: https://nextra.site/docs/docs-theme/theme-configuration
 */
const config: DocsThemeConfig = {
  chat: {
    link: "https://discord.gg/UuYKTVMW",
  },
  docsRepositoryBase: "https://github.com/drash-website-v2",
  footer: {
    text: (
      <div className="flex w-full justify-center">
        <span className="text-xs uppercase font-semibold">&copy; 2019 - 2023 Drash Land</span>
      </div>
    ),
  },
  head: () => {
    const { frontMatter, title: titleFromConfig } = useConfig();

    let title = "Drash";

    if (frontMatter && frontMatter.head_title) {
      title = `${title} - ${frontMatter.head_title}`;
    } else {
      title = `${title} - ${titleFromConfig}`;
    }

    return <title>{title}</title>;
  },
  sidebar: {
    defaultMenuCollapseLevel: 3,
    titleComponent: (item) => {
      const { title, type } = item;

      if (title === "-logo-") {
        return (
          <div className="logo logo-drash flex nx-justify-center w-full">
            <Image
              src={"/logo-drash.svg"}
              width="100"
              height="100"
              alt="Logo - Drash"
            />
          </div>
        );
      }

      if (type === "separator") {
        return (
          <span className="sidebar-separator-title nx-text-slate-900 dark:nx-text-slate-100 nx-font-bold">
            {title}
          </span>
        );
      }

      return title;
    },
  },
  logo: (
    <div className="text-[11px] uppercase font-semibold">
      <span className="nx-text-gray-400">Drash Land</span> · <span className="nx-text-gray-800">Drash</span>
    </div>
  ),
  navigation: false,
  project: {
    link: "https://github.com/drashland/drash/tree/v3.x-beta",
  },
  darkMode: false,
};

export default config;
