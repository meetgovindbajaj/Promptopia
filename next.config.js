/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ['mongoose'], isrMemoryCacheSize: 50 },
  images: { domains: ['lh3.googleusercontent.com', 'https://s3.scriptcdn.net'] },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
