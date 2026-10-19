import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shown in the footer as "Last run: <date>" and in the console report.
  images: { formats: ["image/avif", "image/webp"] },
  env: { NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10) },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
