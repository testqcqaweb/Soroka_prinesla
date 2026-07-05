import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/Soroka_prinesla" : "",
  assetPrefix: isGithubPages ? "/Soroka_prinesla/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
