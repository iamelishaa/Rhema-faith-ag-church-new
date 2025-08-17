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
    // Allow all domains in development, but restrict in production for security
    domains: process.env.NODE_ENV === 'development' 
      ? ['*'] 
      : [
          'i.ytimg.com',
          'i1.ytimg.com',
          'i2.ytimg.com',
          'i3.ytimg.com',
          'i4.ytimg.com',
          'img.youtube.com',
          'rhema-faith-ag-church.netlify.app',
          'localhost',
        ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rhema-faith-ag-church.netlify.app',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize for both mobile and desktop
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Common image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable WebP for better compression
    formats: ['image/webp'],
    // Cache images for 1 hour (in seconds)
    minimumCacheTTL: 3600,
    // Enable static image imports
    disableStaticImages: false,
    // Enable content security policy for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable unoptimized images for static export
    unoptimized: process.env.NODE_ENV === 'production',
  },
  
  // Static export configuration
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next/static' : undefined,

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
