const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join("./app/*", "styles")],
  },
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
