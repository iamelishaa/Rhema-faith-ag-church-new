/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: false, // Disabled for debugging
  
  // Environment variables
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || ''
  },

  // Image optimization
  images: {
    // Disable image optimization API for static export
    unoptimized: true,
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
    // Disable remote patterns for static export
    remotePatterns: [],
    // Basic device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Basic image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable WebP for static export
    formats: [],
    // Disable cache for static export
    minimumCacheTTL: 0,
    // Disable static image imports for static export
    disableStaticImages: true,
    // Disable SVG optimization for static export
    dangerouslyAllowSVG: false,
    // Disable content security policy for static export
    contentSecurityPolicy: "",
  },
  
  // Static export configuration
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next/static' : undefined,
  
  // Generate build ID for production
  generateBuildId: async () => {
    return process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'build-' + Date.now();
  },

  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Add custom webpack configuration here if needed
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enable static HTML export
  trailingSlash: true,
  
  // Disable server components for static export
  experimental: {
    appDir: false,
  },
  
};

module.exports = withPWA(nextConfig);
