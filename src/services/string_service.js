/**
 * Convert a filename to a URL. For example:
 *   - Given `/docs/drash/v2.x/1_getting_started/1_introduction.md`
 *   - When the above filename is processed through this function
 *   - Then it ends up being convereted to `/drash/v2.x/getting-started/introduction` for Next.js
 *
 * @param {string} filename - The filename to convert to a URL.
 * @returns A URL version of a filename.
 */
export function convertFilenameToURL(filename) {
  return filename
    .split("/") // Split the filename into path parts so we can clean up each part in `.map()`
    .map((path) => {
      // Remove all prefixed numbers and underscores from each path part. For example, a filename
      // like `1_getting_started.md` would be converted to `getting_started`.
      return path.replace(/[0-9]+_/, "");
    })
    .join("/") // Put back the filename with number prefixes removed
    .replace("docs", "/") // The `/docs` part of the filename is not used in the URL
    .replace(/_/g, "-") // Make URLs look like `/some-path` and not `/some_path`
    .replace(".md", "") // The `.md` extension of the filename is not used in the URL
    .replace(/\/\//g, "/"); // In case we ended up with double slashes, clean them up
}

/**
 * Format a label to a user-friendly one -- ensuring all hyphens are in place,
 * all acronyms are capitalized, etc.
 *
 * @param {string} label - The label to format.
 *
 * @returns {string} The formatted label.
 */
export function formatLabel(label) {
  const replacements = [
    {
      from: /Api/g,
      to: "API",
    },
    {
      from: /Clis/g,
      to: "CLIs",
    },
    {
      from: /Cors/g,
      to: "CORS",
    },
    {
      from: /Csrf/g,
      to: "CSRF",
    },
    {
      from: /Etag/g,
      to: "ETag",
    },
    {
      from: /Graphql/g,
      to: "GraphQL",
    },
    {
      from: /Http/g,
      to: "HTTP",
    },
    {
      from: /Https|HTTPs/g,
      to: "HTTPS",
    },
    {
      from: /Json/g,
      to: "JSON",
    },
    {
      from: /Part 1/g,
      to: "Part 1:",
    },
    {
      from: /Part 2/g,
      to: "Part 2:",
    },
    {
      from: /Part 3/g,
      to: "Part 3:",
    },
    {
      from: /Part 4/g,
      to: "Part 4:",
    },
    {
      from: /Resource Level/g,
      to: "Resource-Level",
    },
    {
      from: /(Server Level)/g,
      to: "Server-Level",
    },
    {
      from: /Spa/g,
      to: "SPA",
    },
    {
      from: /Ssr/g,
      to: "SSR",
    },
    {
      from: /Url/g,
      to: "URL",
    },
    {
      from: /V2/g,
      to: "v2",
    },
    {
      from: /V3/g,
      to: "v3",
    },
    {
      from: /Websocket/g,
      to: "WebSocket",
    },
  ];

  replacements.forEach((replacement) => {
    label = label.replace(/-/g, " ");
    label = label.replace(replacement.from, replacement.to);
  });

  return label;
}

export function hydrateMarkdown(markdown, moduleVersion) {
  markdown = markdown
    .split("\n")
    .map((markdownLine) => {
      return fillMarkdownPlaceholders(markdownLine, moduleVersion)
    })
    .join("\n");

  return markdown;
}

function fillMarkdownPlaceholders(markdownLine, moduleVersion) {
  if (markdownLine.includes("{{ step: create deps drash }}")) {
    markdownLine = markdownLine.replace("{{ create_deps_ts_file_drash }}", `1. Create your \`deps.ts\` file.`);
  }

  if (markdownLine.includes("// @Import drash")) {
    markdownLine = markdownLine.replace(
      `// @Import drash`,
      `import * as Drash from "https://deno.land/x/drash@<LATEST ${moduleVersion} VERSION>/mod.ts"`
    );
  }

  return markdownLine;
}
