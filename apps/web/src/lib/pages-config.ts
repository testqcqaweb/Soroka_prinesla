export const REPO_BASE_PATH = "/Soroka_prinesla";
export const GITHUB_PAGES_SITE_URL = `https://testqcqaweb.github.io${REPO_BASE_PATH}`;

export function getPagesEnvConfig(isGithubPages: boolean) {
  return {
    basePath: isGithubPages ? REPO_BASE_PATH : "",
    assetPrefix: isGithubPages ? `${REPO_BASE_PATH}/` : undefined,
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? REPO_BASE_PATH : "",
    NEXT_PUBLIC_SITE_URL: isGithubPages ? GITHUB_PAGES_SITE_URL : "http://localhost:3000",
  };
}
