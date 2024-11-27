import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        search: "?v=1727111025337",
      },
    ],
  },
};

export default nextConfig;
