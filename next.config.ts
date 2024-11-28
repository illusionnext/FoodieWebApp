/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
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

module.exports = nextConfig;
