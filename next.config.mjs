/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    MOCK_API: "https://66a9a2a4613eced4eba5c4aa.mockapi.io",
    PAGINATION_API: "https://api.free-apis-2024.cunguyen.com/pagination",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
