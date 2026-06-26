/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["10.50.29.91"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
    ],
  },
};

module.exports = nextConfig;
