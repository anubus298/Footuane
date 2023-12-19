/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-4.api-sports.io",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
