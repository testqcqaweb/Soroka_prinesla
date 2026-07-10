import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPagesEnvConfig } from "./src/lib/pages-config";

const turbopackRoot = path.dirname(fileURLToPath(import.meta.url));

const isGithubPages = process.env.GITHUB_PAGES === "true" && process.env.NODE_ENV === "production";
const pagesEnv = getPagesEnvConfig(isGithubPages);

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
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
