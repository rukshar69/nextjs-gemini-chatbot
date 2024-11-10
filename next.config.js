/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig

// Next.js can automatically create a standalone folder that copies only the necessary 
// files for a production deployment including all your node_modules.
module.exports = {
  output: "standalone",
};