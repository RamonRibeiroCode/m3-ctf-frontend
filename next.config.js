/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.hackingclub.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
