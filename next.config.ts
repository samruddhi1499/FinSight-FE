import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",                       // frontend route
        destination: "https://finsight-be.onrender.com/api/:path*", // backend API
      },
    ];
  },
};

export default nextConfig;
