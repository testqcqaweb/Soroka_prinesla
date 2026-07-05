import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Soroka_prinesla";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? repoBasePath : "",
  assetPrefix: isGithubPages ? `${repoBasePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
    NEXT_PUBLIC_SITE_URL: isGithubPages
      ? `https://testqcqaweb.github.io${repoBasePath}`
      : "http://localhost:3000",
  },
};

export default nextConfig;
