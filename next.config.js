/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled for debugging
  
  // Environment variables
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || ''
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
  },

  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Add custom webpack configuration here if needed
    return config;
  },

  // Build output configuration
  output: 'standalone',
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Only enable PWA in production
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
