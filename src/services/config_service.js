import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export { publicRuntimeConfig };

/**
 * For the module being currently viewed, get the API reference URL associated
 * with the module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns {string} - The API reference URL for the given module.
 */
export function getApiReferenceUrl(moduleName) {
  moduleName = moduleName.toLowerCase();
  return publicRuntimeConfig.docDenoLandUrls[moduleName.toLowerCase()];
}

/**
 * Get the URL to create a GitHub issue.
 *
 * @param {string} pageUri - This URI is sent as a URL query param to the GitHub
 * issue URL. It ends up in the GitHub issue's title.
 *
 * @returns {string} - The GitHub issue URL.
 */
export function getGitHubCreateIssueUrl(pageUri) {
  return `${publicRuntimeConfig.gitHubUrls.website}/issues/new?assignees=&labels=Needs%20Investigation%2C+documentation&template=documentation_page_issue.md&title=Issue%20on%20${pageUri} page`;
}

/**
 * Get the GitHub URL for the given module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns {string} - The GitHub URL for the given module.
 */
export function getGitHubUrl(moduleName) {
  // If there is no module, then it probably means we're on the homepage. If
  // we're on the homepage, then we want the GitHub URL to be the Drash Land
  // org page.
  if (!moduleName) {
    return "https://github.com/drashland";
  }

  moduleName = moduleName.toLowerCase();

  return publicRuntimeConfig.gitHubUrls[moduleName];
}

/**
 * For the module being currently viewed, get the Roadmaps URL associated with the module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns {string} - The roadmaps URL for the given module.
 */
export function getRoadmapsUrl(moduleName) {
  moduleName = moduleName.toLowerCase();

  if (!publicRuntimeConfig.roadmapsUrls[moduleName]) {
    return false;
  }

  return publicRuntimeConfig.roadmapsUrls[moduleName];
}

/**
 * Get all of the module's versions.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns The latest version.
 */
export function getVersions(moduleName) {
  moduleName = moduleName.toLowerCase();

  return publicRuntimeConfig.versions[moduleName].versions;
}

/**
 * Get the latest version for the module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns The latest version.
 */
export function getLatestVersion(moduleName) {
  moduleName = moduleName.toLowerCase();

  const versions = getVersions(moduleName);

  if (!versions || versions.length <= 0) {
    throw new Error(
      `Versions array for ${moduleName} is empty or does not exist.`,
    );
  }

  // Last version is the latest
  return versions[versions.length - 1];
}
