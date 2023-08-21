import React from "react";
import { Card, Cards, DocsThemeConfig, useConfig } from "nextra-theme-docs";
import Image from "next/image";

/**
 * Theme Configuration docs: https://nextra.site/docs/docs-theme/theme-configuration
 */
const config: DocsThemeConfig = {
  chat: {
    link: "https://discord.gg/RhYs6zQJ",
  },
  docsRepositoryBase: "https://github.com/drash-website-v2",
  footer: {
    text: <span>Drash Land | Drash | &copy; 2019 - 2023 Drash Land</span>,
  },
  head: () => {

    const { frontMatter, title: titleFromConfig } = useConfig();

    let title = "Drash";

    if (notEmptyString(titleFromConfig)) {
      title = `${title} - ${titleFromConfig}`;
    }

    // if (frontMatter && notEmptyString(frontMatter.title)) {
    //   title = `${title} - ${frontMatter.title}`;
    // }

    return (
      <>
        <title>{title}</title>
      </>
    );
  },
  sidebar: {
    defaultMenuCollapseLevel: 3,
    toggleButton: true,
    titleComponent: (item) => {
      const { title, type } = item;

      if (title === "-logo-") {
        return (
          <div className="logo logo-drash flex nx-justify-center w-full">
            <Image src={"/logo-drash.svg"} width="100" height="100" alt="Logo - Drash"/>
          </div>
        );
      }

      if (type === "separator") {
        return <span className="sidebar-separator-title nx-text-slate-900 dark:nx-text-slate-100 nx-font-bold">{title}</span>
      }

      console.log({ title })

      return title;
    }
  },
  logo: "Drash",
  navigation: false,
  project: {
    link: "https://github.com/drashland/drash",
  },
};

function notEmptyString(str: string) {
  return str && (typeof str === "string") && (str.trim() !== "");
}

export default config;
