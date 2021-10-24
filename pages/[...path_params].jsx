import { useEffect, useState } from "react";
import * as fs from "fs";
import path from "path";
import Markdown from 'markdown-to-jsx';
import Layout from "../src/components/Layout";
import styled, { ThemeContext } from "styled-components";
import { titleCase } from "title-case";
import { useRouter } from "next/router";
import { formatLabel } from '../src/services/string_service';
import getConfig from "next/config";
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
} from "../src/components/Layout";

const { publicRuntimeConfig } = getConfig();

const MODULES = [
  "drash",
  "sinco",
];

const FILES = {};

export default function Page(props) {
  const { redirectUri } = props;

  const router = useRouter();

  useEffect(() => {
    if (redirectUri) {
      return router.push(redirectUri);
    }

    // Make sure all code blocks are highlighted
    window.Prism.highlightAll();
  }, [redirectUri, router]);

  return (
    <Layout
      topBarModuleName={props.topBarModuleName}
      sideBarCategories={props.sideBarCategories}
      moduleVersion={props.moduleVersion}
      moduleVersions={props.moduleVersions}
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
        {props.markdown}
      </Markdown>
    </Layout>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - SERVER FUNCTIONS //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getStaticProps({ params }) {
  const paths = getAllPaths("docs");

  const moduleName = params.path_params.slice().shift().replace("/", "");

  let markdown = null;

  try {
    const filepath = "/" + params.path_params.join("/");
    markdown = fs.readFileSync(FILES[filepath], "utf-8");
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

  let redirectUri = null;
  if (params.path_params.length <= 2) {
    if (MODULES.indexOf(params.path_params[0]) != -1) {
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
