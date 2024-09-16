/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
  headers: () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  productionBrowserSourceMaps: true,
};

export default nextConfig;
