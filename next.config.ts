import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === "production"
          ? `${process.env.API_URL}/:path*`
          : "http://localhost:4000/api/:path*",
      },
    ];
  },

  generateBuildId: async () => {
    return process.env.BUILD_ID || crypto.randomUUID()
  },
};

export default nextConfig;

