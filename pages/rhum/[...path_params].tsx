import { useCallback, useEffect } from "react";
import * as fs from "fs";
import Layout from "@/src/components/Layout";
import { titleCase } from "title-case";
import { useRouter } from "next/router";
import {
  convertFilenameToURL,
  formatLabel,
} from "@/src/services/string_service";
import ReactMarkdown from "react-markdown";
import * as Markdown from "@/src/components/Markdown";
import { runtimeConfig } from "@/src/config";
import env from "@/src/env";
import LayoutV2 from "@/src/components/layouts/LayoutV2";

const FILES = {};

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

type Props = {
  editThisPageUrl: string;
  markdown: string;
  moduleVersion: string;
  moduleVersions: string[];
  pageModifiedTime: string;
  redirectUri: string;
  sideBarCategories: Docs.V2.SidebarCategory[];
  topBarModuleName: string;
};

export default function Page(props: Props) {
  const {
    editThisPageUrl,
    markdown,
    moduleVersion,
    moduleVersions,
    pageModifiedTime,
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

    const title = formatLabel(
      titleCase(breadcrumbs[breadcrumbs.length - 1]),
    );

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
      pageModifiedTime={pageModifiedTime}
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
  getAllPaths("docs/rhum/v2.x");

  const ret: { props: Partial<Props> } = {
    props: {
      editThisPageUrl: null,
      redirectUri: null,
      pageModifiedTime: null,
    },
  };

  const moduleName = "rhum";
  ret.props.topBarModuleName = titleCase(moduleName);

  const versions = runtimeConfig.versions[moduleName].versions;
  let version = "v2.x";

  ret.props.moduleVersion = version;
  ret.props.moduleVersions = versions;

  ret.props.sideBarCategories = getSideBarCategories(moduleName, version);

  const pageUri = "/" + params.path_params.join("/");
  console.log({ pageUri, FILES });
  const markdownFile = FILES["/rhum" + pageUri];

  ret.props.editThisPageUrl =
    `${runtimeConfig.gitHubUrls.website}/edit/main/${markdownFile}`;

  ret.props.markdown = null;

  if (markdownFile) {
    try {
      const stats = fs.statSync(markdownFile);
      ret.props.pageModifiedTime = stats.mtime.toLocaleString();
      ret.props.markdown = fs.readFileSync(markdownFile, "utf-8");
    } catch (error) {
      if (
        (env("app_env", "production") !== "production") ||
        (env("app_process", null) !== "build")
      ) {
        console.log(`\nMarkdown Error\n`, error);
      }
    }
  }

  return ret;
}

export function getStaticPaths() {
  const paths = getAllPaths("docs/rhum/v2.x")
    .filter((path) => path !== "/rhum/v2.x");

  return {
    paths,
    fallback: false,
  };
}

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - FUNCTIONS /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getAllPaths(fileNameOrPath: string, paths: string[] = []): string[] {
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

function getSideBarCategories(
  moduleName: string,
  version: string,
): Docs.V2.SidebarCategory[] {
  const tree = getDirectoryTree("docs");

  const moduleVersions = tree[0].paths.filter((path) => {
    return path.label.toLowerCase() == moduleName;
  })[0];

  const moduleVersion = moduleVersions.paths.filter((path) => {
    return path.label == version;
  })[0];

  return moduleVersion.paths;
}

function getCategoryLabel(title): string {
  const label = titleCase(title).replace(/-/g, " ");
  return formatLabel(label);
}

Page.getLayout = (page) => {
  return (
    <LayoutV2>
      {page}
    </LayoutV2>
  );
};
