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
    .replace("(node)", "node") // The `(node)` part of the filename should not have parens
    .replace("(deno)", "deno") // The `(deno)` part of the filename should not have parens
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
      from: /Server Level/g,
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
      from: /V4/g,
      to: "v4",
    },
    {
      from: /Websocket/g,
      to: "WebSocket",
    },
  ];

  let formattedLabel;

  replacements.forEach((replacement) => {
    // All labels come in with hyphens (e.g., Hello-World). We need to remove these hypens first.
    label = label.replace(/-/g, " ");

    // If the unhyphenated label does not match the current replacement object being iterated on,
    // then go to the next one
    if (!label.match(replacement.from)) {
      return;
    }

    // If we get here, then the unhyphenated label matched. That means we can perform a replacement.
    // We only perform the replacement once.
    if (!formattedLabel) {
      formattedLabel = label.replace(replacement.from, replacement.to);
    }
  });

  // If we made a replacement, then return the formatted label. Otherwise, return the label that was
  // passed in.
  return formattedLabel ?? label;
}
