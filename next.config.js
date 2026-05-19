/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/cortexure",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true
};

module.exports = nextConfig;
