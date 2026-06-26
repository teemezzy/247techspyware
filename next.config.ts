import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Any HTTPS host — covers Unsplash, S3/CloudFront, Supabase storage, etc.
      { protocol: "https", hostname: "**" },
      // Local API for development
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
