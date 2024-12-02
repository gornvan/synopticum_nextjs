import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pages/home',
        permanent: true,  // This will make it a permanent redirect (HTTP 301)
      },
    ];
  },
};



export default nextConfig;
