/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.pet.gov.tw"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
