import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactRefresh: true,
  },
  allowImportingTsExtensions: true,
};

export default nextConfig;
