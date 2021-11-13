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
      from: /Graphql/g,
      to: "GraphQL"
    },
    {
      from: /Http/g,
      to: "HTTP"
    },
    {
      from: /Https|HTTPs/g,
      to: "HTTPS"
    },
    {
      from: /Json/g,
      to: "JSON"
    },
    {
      from: /Url/g,
      to: "URL"
    },
    {
      from: /(Server Level)/g,
      to: "Server-Level"
    },
    {
      from: /Resource Level/g,
      to: "Resource-Level"
    },
    {
      from: /Cors/g,
      to: "CORS"
    },
    {
      from: /Csrf/g,
      to: "CSRF"
    },
    {
      from: /Api/g,
      to: "API"
    },
    {
      from: /Ssr/g,
      to: "SSR"
    },
    {
      from: /Spa/g,
      to: "SPA"
    },
    {
      from: /V2/g,
      to: "v2"
    },
    {
      from: /Websocket/g,
      to: "WebSocket"
    },
  ];

  replacements.forEach((replacement) => {
    label = label.replace(/-/g, " ");
    label = label.replace(replacement.from, replacement.to);
  });

  return label;
}
