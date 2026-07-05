import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/Obsidian_design" : "",
  assetPrefix: isGithubPages ? "/Obsidian_design/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
