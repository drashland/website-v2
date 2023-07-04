import { useCallback, useEffect, useState } from "react";
import * as fs from "fs";
import path from "path";
import Layout from "@/src/components/Layout";
import styled, { ThemeContext } from "styled-components";
import { titleCase } from "title-case";
import { useRouter } from "next/router";
import {
  convertFilenameToURL,
  formatLabel,
} from "../src/services/string_service";
import ReactMarkdown from "react-markdown";
import * as Markdown from "@/src/components/Markdown";
import { runtimeConfig } from "@/src/config";
import env from "@/src/env";

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

type Props = {
  editThisPageUrl: string;
  markdown: string;
  moduleVersion: string;
  moduleVersions: string[];
  redirectUri: string;
  sideBarCategories: any;
  topBarModuleName: string;
};

export default function Page(props: Props) {
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

  /**
   * Get the breadcrumbs that go at the top of every page.
   *
   * @returns {string[]} - An array of breadcrumbs.
   */
  const getPageTitle = useCallback(() => {
    const pathParts = router.asPath.split("#")[0];
    const breadcrumbs = pathParts.split("/");
    // The first element is an empty string so take it out
    breadcrumbs.shift();

    const title = formatLabel(titleCase(breadcrumbs[breadcrumbs.length - 1]));

    return `Drash Land / ${topBarModuleName} / ${title}`;
  }, [router.asPath, topBarModuleName]);

  useEffect(() => {
    // If we are redirecting, then we need to do that as soon as possible
    if (redirectUri) {
      router.replace(redirectUri);
      return;
    }

    window.document.title = getPageTitle();

    // Make sure all code blocks are highlighted
    // @ts-ignore This exists. The typing doesn't though. Add it maybe?
    window.Prism.highlightAll();
  }, [getPageTitle, redirectUri, router]);

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
          // @ts-ignore Add the typing later
          blockquote: Markdown.Blockquote,
          // @ts-ignore Add the typing later
          h1: Markdown.Heading1,
          // @ts-ignore Add the typing later
          h2: Markdown.Heading2,
          // @ts-ignore Add the typing later
          h3: Markdown.Heading3,
          // @ts-ignore Add the typing later
          h4: Markdown.Heading4,
          code: Markdown.Code,
          pre: Markdown.Pre,
          p: Markdown.Paragraph,
          // @ts-ignore Add the typing later
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
  getAllPaths("docs");

  const ret: { props: Partial<Props> } = {
    props: {
      editThisPageUrl: null,
      redirectUri: null,
    },
  };

  const moduleName = params.path_params[0];
  ret.props.topBarModuleName = titleCase(moduleName);

  const versions = runtimeConfig.versions[moduleName].versions;
  let version = params.path_params[1];

  if (!version) {
    version = versions[versions.length - 1];
  }

  ret.props.moduleVersion = version;
  ret.props.moduleVersions = versions;

  ret.props.sideBarCategories = getSideBarCategories(moduleName, version);

  // Check if we need to redirect the user to the Introduction page. This code
  // exists because users can go to https://drash.land/drash, but that page
  // doesn't actually exist. So, we redirect them to the following URL:
  //
  //     https://drash.land/{module}/{version}/getting-started/introduction
  //
  if (params.path_params.length <= 2) {
    if (runtimeConfig.modules.indexOf(params.path_params[0]) != -1) {
      ret.props.redirectUri =
        `${moduleName}/${version}/getting-started/introduction`;
    }
  }

  const pageUri = "/" + params.path_params.join("/");
  const markdownFile = FILES[pageUri];

  ret.props.editThisPageUrl =
    `${runtimeConfig.gitHubUrls.website}/edit/main/${markdownFile}`;

  ret.props.markdown = null;

  if (markdownFile) {
    try {
      ret.props.markdown = fs.readFileSync(markdownFile, "utf-8");
    } catch (error) {
      if (
        (env('app_env', 'production') !== 'production')
        || (env('app_process', null) !== 'build')
        ) {
        console.log(`\nMarkdown Error\n`, error);
      }
    }
  }

  return ret;
}

export function getStaticPaths() {
  const paths = getAllPaths("docs");
  return {
    paths,
    fallback: false,
  };
}

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - FUNCTIONS /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getAllPaths(fileNameOrPath, paths: string[] = []): string[] {
  const stats = fs.lstatSync(fileNameOrPath);

  if (fileNameOrPath.match(/DS.+Store/g)) {
    return;
  }

  const file = convertFilenameToURL(fileNameOrPath);

  FILES[file] = fileNameOrPath;

  paths.push(file);

  if (stats.isDirectory()) {
    const nested = fs.readdirSync(fileNameOrPath)
      .map((child) => {
        return getAllPaths(fileNameOrPath + "/" + child, paths);
      });

    paths.concat(...nested);
  }

  return paths
    .filter((path) => {
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

function getSideBarCategories(moduleName, version) {
  const tree = getDirectoryTree("docs");
  const moduleVersions = tree[0].paths.filter((path) => {
    return path.label.toLowerCase() == moduleName;
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
