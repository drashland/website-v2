import { useEffect, useState } from "react";
import * as fs from "fs";
import path from "path";
import Markdown from 'markdown-to-jsx';
import Layout from "../src/components/Layout";
import styled, { ThemeContext } from "styled-components";
import { titleCase } from "title-case";
import { useRouter } from "next/router";
import { formatLabel } from '../src/services/string_service';
import { publicRuntimeConfig } from "../src/services/config_service";
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  HorizontalRule,
  Image,
  ListItem,
  OrderedList,
  Paragraph,
  Pre,
  RestyledCode,
  UnorderedList,
} from "../src/components/Markdown";

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
    redirectUri,
    topBarModuleName,
    sideBarCategories,
    markdown,
    moduleVersion,
    moduleVersions,
  } = props;

  const router = useRouter();

  useEffect(() => {
    // If we are redirecting, then we need to do that as soon as possible
    if (redirectUri) {
      return router.push(redirectUri);
    }

    // Make sure all code blocks are highlighted
    window.Prism.highlightAll();
  }, [redirectUri, router]);

  return (
    <Layout
      topBarModuleName={topBarModuleName}
      sideBarCategories={sideBarCategories}
      moduleVersion={moduleVersion}
      moduleVersions={moduleVersions}
    >
      <Markdown
        options={{
          overrides: {
            h1: {
              component: Heading1
            },
            h2: {
              component: Heading2
            },
            h3: {
              component: Heading3
            },
            h4: {
              component: Heading4
            },
            hr: {
              component: HorizontalRule
            },
            p: {
              component: Paragraph
            },
            ul: {
              component: UnorderedList
            },
            ol: {
              component: OrderedList
            },
            li: {
              component: ListItem
            },
            code: {
              component: RestyledCode
            },
            pre: {
              component: Pre
            },
            img: {
              component: Image
            }
          }
        }}
      >
        {markdown}
      </Markdown>
    </Layout>
  );
}

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - SERVER FUNCTIONS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export async function getStaticProps({ params }) {
  const paths = getAllPaths("docs");

  const moduleName = params.path_params.slice().shift().replace("/", "");

  let markdown = null;

  try {
    const pageUri = "/" + params.path_params.join("/");
    markdown = fs.readFileSync(FILES[pageUri], "utf-8");
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

  // Check if we need to redirect the user to the Introduction page. This code
  // exists because users can go to https://drash.land/drash, but that page
  // doesn't actually exist. So, we redirect them to the following URL:
  //
  //     https://drash.land/drash/getting-started/introduction
  //
  let redirectUri = null;
  if (params.path_params.length <= 2) {
    if (publicRuntimeConfig.modules.indexOf(params.path_params[0]) != -1) {
      redirectUri = `${module}/${version}/getting-started/introduction`;
    }
  }

  return {
    props: {
      markdown: markdown ? markdown : "",
      moduleVersion: version,
      moduleVersions: versions,
      sideBarCategories: getSideBarCategories(module, version),
      topBarModuleName: titleCase(moduleName),
      redirectUri,
    },
  };
}

export async function getStaticPaths() {
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

  const file = filename
    .replace(/[0-9]+_/g, "")
    .replace("docs", "/")
    .replace(/_/g, "-")
    .replace(".md", "")
    .replace(/\/\//g, "/");

  FILES[file] = filename;

  paths.push(file);

  if (stats.isDirectory()) {
    fs.readdirSync(filename).forEach((child) => {
        getAllPaths(filename + '/' + child, paths);
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
    is_directory: stats.isDirectory(),
    label: getCategoryLabel(baseName
      .replace(/[0-9]_/, "")
      .replace("docs", "/")
      .replace(/_/g, " ")
      .replace(".md", "")
      .replace(/\/\//g, "/")),
    path: path
      .replace(/[0-9]+_/g, "")
      .replace("docs", "/")
      .replace(/_/g, "-")
      .replace(".md", "")
      .replace(/\/\//g, "/"),
    paths: [],
  };

  if (!path.match(/DS.+Store/g)) {
    paths.push(setPath);
  }

  if (stats.isDirectory()) {
    fs.readdirSync(path).forEach((child) => {
        getDirectoryTree(path + '/' + child, setPath.paths);
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
