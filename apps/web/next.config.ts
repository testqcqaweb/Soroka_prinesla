import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Soroka_prinesla";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? repoBasePath : "",
  assetPrefix: isGithubPages ? `https://testqcqaweb.github.io${repoBasePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
