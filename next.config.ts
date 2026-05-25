import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      // Allow any HTTPS source so brands can reference CDN/S3/Blob URLs freely.
      // Tighten per-brand in production if needed.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default config;
