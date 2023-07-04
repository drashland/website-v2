/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  redirects() {
    return [
      // Redirect pages without content to the nearest page with content
      {
        source: "/drash/v2.x/getting-started",
        destination: "/drash/v2.x/getting-started/introduction",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials",
        destination:
          "/drash/v2.x/tutorials/introduction/add-drash-as-a-dependency",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/resources",
        destination: "/drash/v2.x/tutorials/resources/creating-a-resource",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/requests",
        destination: "/drash/v2.x/tutorials/requests/handling-json-bodies",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/responses",
        destination: "/drash/v2.x/tutorials/responses/setting-the-body",
        permanent: false,
      },
      {
        source: "/drash/v2.x/tutorials/services",
        destination: "/drash/v2.x/tutorials/services/introduction",
        permanent: false,
      },
      // Remove the below /drash/v1.x object when its migrated
      {
        source: "/drash/v1.x",
        destination: "/drash/v1.x/index.html",
        permanent: false,
      },
      {
        source: "/wocket/v0.x",
        destination: "/wocket/v0.x/index.html",
        permanent: false,
      },
      // Remove the below /dmm object when the its migrated
      {
        source: "/dmm/v1.x",
        destination: "/dmm/v1.x/index.html",
        permanent: false,
      },
      // Remove the below /rhum object when the its migrated
      {
        source: "/rhum/v1.x",
        destination: "/rhum/v1.x/index.html",
        permanent: false,
      },
      {
        source: "/line/v0.x",
        destination: "/line/v0.x/index.html",
        permanent: false,
      },
      {
        source: "/sinco/v1.x",
        destination: "/sinco/v1.x/index.html",
        permanent: false,
      },
      // Redirect pages that have their URLs changed and document when the redirection should be
      // removed.  Redirections should be removed at least 2 months out.
      permanentRedirect(
        // Remove on 07-01-2022
        "/drash/v2.x/tutorials/services/introduction",
        "/drash/v2.x/tutorials/services/basics",
      ),
      permanentRedirect(
        // Remove on 07-01-2022
        "/drash/v2.x/tutorials/services/creating-services",
        "/drash/v2.x/tutorials/services/creating-services/introduction",
      ),
      permanentRedirect(
        // Remove on 07-01-2022
        "/drash/v2.x/tutorials/services/adding-server-level-services",
        "/drash/v2.x/tutorials/services/creating-services/server-level/introduction",
      ),
      permanentRedirect(
        // Remove on 07-01-2022
        "/drash/v2.x/tutorials/services/adding-resource-level-services",
        "/drash/v2.x/tutorials/services/creating-services/resource-level/introduction",
      ),
    ];
  },
};

/**
 * Create a permanent redirect.
 *
 * @param {string} source - Where are we redirecting from?
 * @param {string} destination - Where are we redirecting to?
 * @returns {object} - Object with source, destination, and permanent fields.
 */
function permanentRedirect(source, destination) {
  return {
    source,
    destination,
    permanent: true,
  };
}
