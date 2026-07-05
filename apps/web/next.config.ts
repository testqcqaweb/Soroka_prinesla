import type { NextConfig } from "next";
import { getPagesEnvConfig } from "./src/lib/pages-config";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const pagesEnv = getPagesEnvConfig(isGithubPages);

const nextConfig: NextConfig = {
  output: "export",
  basePath: pagesEnv.basePath,
  assetPrefix: pagesEnv.assetPrefix,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: pagesEnv.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_SITE_URL: pagesEnv.NEXT_PUBLIC_SITE_URL,
  },
};

export default nextConfig;
