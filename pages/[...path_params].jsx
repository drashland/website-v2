import { useEffect } from "react";
import * as fs from "fs";
import path from "path";
import Markdown from 'markdown-to-jsx';
import Layout from "../src/components/Layout";
import styled from "styled-components";
import { titleCase } from "title-case";
import { useRouter } from "next/router";
import { formatLabel } from '../src/string_service';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const MARGIN_BOTTOM = "margin-bottom: 1.25rem !important;";

const MODULES = [
  "drash",
  "sinco",
];

const FILES = {};

const Heading1 = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
`;

const Heading2 = styled.h2`
  border-top: .25rem solid #f4f4f4;
  margin-top: 2.5rem !important;
  padding-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
`;

const Heading3 = styled.h3`
  margin-top: 1.6rem !important;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
  ${MARGIN_BOTTOM};
`;

const Heading4 = styled.h3`
  margin-top: 1.6rem !important;
  font-size: 1.3rem;
  font-weight: bold;
  ${MARGIN_BOTTOM};
`;

const ListItem = styled.li`
`;

const Code = function({ className, children }) {
  return (
    <code
      className={className && className.replace("lang-", " language-")}
    >
      {children}
    </code>
  );
}

const Paragraph = styled.p`
  ${MARGIN_BOTTOM};
`;

const RestyledCode = styled(Code)`
  font-size: .85rem;
  background-color: #f4f4f4;
  border-radius: 1rem;
  color: #d43790;
  font-weight: 500;
  padding: .25rem .5rem;
`;

const Pre = styled.pre`
  background: #2f343c !important;
  border-radius: 1rem;
  ${MARGIN_BOTTOM};

  &[class*=language-] {
    ${MARGIN_BOTTOM};
  }

  code {
    font-size: .85rem;
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
`;

const OrderedList = styled.ol`
  ${MARGIN_BOTTOM};
`;

const UnorderedList = styled.ul`
  ${MARGIN_BOTTOM};
`;

const Image = styled.img`
  border: 1px solid #dfdfdf;
`;

export default function Page(props) {
  const { redirectUri } = props;

  const router = useRouter();

  useEffect(() => {
    if (redirectUri) {
      return router.replace(redirectUri);
    }

    // Make sure all code blocks are highlighted
    window.Prism.highlightAll();
  }, [redirectUri, router]);

  return (
    <Layout
      willRedirect={redirectUri}
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
    console.log(filepath)
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
