import { useEffect, useState } from "react";
import * as fs from "fs";
import path from "path";
import Layout from "../src/components/Layout";
import styled, { ThemeContext } from "styled-components";
import { titleCase } from "title-case";
import { useRouter } from "next/router";
import {
  convertFilenameToURL,
  formatLabel,
} from "../src/services/string_service";
import { publicRuntimeConfig } from "../src/services/config_service";
import ReactMarkdown from "react-markdown";
import * as Markdown from "../src/components/Markdown";

/**
 * This constant is used for associating all markdown files with page URIs.
 * For example, the object looks like this:
 *
 *     {
 *       "/some/page/uri": "/docs/some/page/uri.md",
 *       "/some/other-page/uri": "/docs/some/other_page/uri.md",
 *     }
 *
 * The `getStaticProps()` function will use this constant to figure out what
 * Markdown file to display to the user. If the user is on the following page...
 *
 *     https://drash.land/drash/v2.x/getting-started/introduction
 *
 * ... then the `getStaticProps()` function will see that the above page is
 * associated with the following Markdown file ...
 *
 *     /docs/drash/v2.x/1_getting_started/1_introduction.md
 *
 * ... and it will read that file and send it to the client.
 */
const FILES = {};

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function Page(props) {
  const {
    editThisPageUrl,
    markdown,
    moduleVersion,
    moduleVersions,
    redirectUri,
    sideBarCategories,
    topBarModuleName,
  } = props;

  const router = useRouter();

  useEffect(() => {
    // If we are redirecting, then we need to do that as soon as possible
    if (redirectUri) {
      return router.replace(redirectUri);
    }

    window.document.title = getPageTitle();

    // Make sure all code blocks are highlighted
    window.Prism.highlightAll();
  }, [redirectUri, router]);

  /**
   * Get the breadcrumbs that go at the top of every page.
   *
   * @returns {string[]} - An array of breadcrumbs.
   */
  function getPageTitle() {
    let breadcrumbs = router.asPath.split("#")[0];
    breadcrumbs = breadcrumbs.split("/");
    // The first element is an empty string so take it out
    breadcrumbs.shift();

    return `Drash Land - ${topBarModuleName} - ${
      formatLabel(titleCase(breadcrumbs[breadcrumbs.length - 1]))
    }`;
  }

  return (
    <Layout
      editThisPageUrl={editThisPageUrl}
      willRedirect={redirectUri}
      topBarModuleName={topBarModuleName}
      sideBarCategories={sideBarCategories}
      moduleVersion={moduleVersion}
      moduleVersions={moduleVersions}
    >
      <ReactMarkdown
        components={{
          blockquote: Markdown.Blockquote,
          h1: Markdown.Heading1,
          h2: Markdown.Heading2,
          h3: Markdown.Heading3,
          h4: Markdown.Heading4,
          li: Markdown.ListItem,
          code: Markdown.Code,
          pre: Markdown.Pre,
          p: Markdown.Paragraph,
          ol: Markdown.OrderedList,
          ul: Markdown.UnorderedList,
          img: Markdown.Image,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Layout>
  );
}

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - SERVER FUNCTIONS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export function getStaticProps({ params }) {
  const paths = getAllPaths("docs");

  const moduleName = params.path_params.slice().shift().replace("/", "");

  const pageUri = "/" + params.path_params.join("/");
  const markdownFile = FILES[pageUri];

  let markdown = null;

  try {
    markdown = fs.readFileSync(markdownFile, "utf-8");
  } catch (error) {
    if (publicRuntimeConfig.app.env !== "production") {
      console.log(`\nMarkdown Error\n`, error);
    }
  }

  const module = params.path_params[0];
  const versions = publicRuntimeConfig.versions[module].versions;
  let version = params.path_params[1];

  if (!version) {
    version = versions[versions.length - 1];
  }

  const editThisPageUrl =
    `${publicRuntimeConfig.gitHubUrls.website}/edit/main/${markdownFile}`;

  // Check if we need to redirect the user to the Introduction page. This code
  // exists because users can go to https://drash.land/drash, but that page
  // doesn't actually exist. So, we redirect them to the following URL:
  //
  //     https://drash.land/{module}/{version}/getting-started/introduction
  //
  let redirectUri = null;
  if (params.path_params.length <= 2) {
    if (publicRuntimeConfig.modules.indexOf(params.path_params[0]) != -1) {
      redirectUri = `${module}/${version}/getting-started/introduction`;
    }
  }

  return {
    props: {
      editThisPageUrl: markdown ? editThisPageUrl : null,
      markdown: markdown ? markdown : "",
      moduleVersion: version,
      moduleVersions: versions,
      sideBarCategories: getSideBarCategories(module, version),
      topBarModuleName: titleCase(moduleName),
      redirectUri,
    },
  };
}

export function getStaticPaths() {
  const paths = getAllPaths("docs");
  return {
    paths,
    fallback: false,
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - FUNCTIONS /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function getAllPaths(filename, paths = []) {
  const stats = fs.lstatSync(filename);

  if (filename.match(/DS.+Store/g)) {
    return;
  }

  const file = convertFilenameToURL(filename);

  FILES[file] = filename;

  paths.push(file);

  if (stats.isDirectory()) {
    fs.readdirSync(filename).forEach((child) => {
      getAllPaths(filename + "/" + child, paths);
    });
  }

  return paths.filter((path) => {
    return path != "/";
  });
}

function getDirectoryTree(path, paths = []) {
  const stats = fs.lstatSync(path);

  let baseName = path.split("/");
  baseName = baseName[baseName.length - 1];

  const setPath = {
    // deno-lint-ignore camelcase
    is_directory: stats.isDirectory(),
    label: getCategoryLabel(
      baseName
        .replace(/[0-9]+_/, "")
        .replace("docs", "/")
        .replace(/_/g, " ")
        .replace(".md", "")
        .replace(/\/\//g, "/"),
    ),
    path: convertFilenameToURL(path),
    paths: [],
  };

  if (!path.match(/DS.+Store/g)) {
    paths.push(setPath);
  }

  if (stats.isDirectory()) {
    fs.readdirSync(path).forEach((child) => {
      getDirectoryTree(path + "/" + child, setPath.paths);
    });
  }

  return paths;
}

function getSideBarCategories(module, version) {
  const tree = getDirectoryTree("docs");
  const moduleVersions = tree[0].paths.filter((path) => {
    return path.label.toLowerCase() == module;
  })[0];

  const moduleVersion = moduleVersions.paths.filter((path) => {
    return path.label == version;
  })[0];

  return moduleVersion.paths;
}

function getCategoryLabel(title) {
  const label = titleCase(title).replace(/-/g, " ");
  return formatLabel(label);
}
