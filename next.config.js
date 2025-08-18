/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Environment variables
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || ''
  },

  // Image optimization
  images: {
    unoptimized: true,
    domains: [
      'i.ytimg.com',
      'i1.ytimg.com',
      'i2.ytimg.com',
      'i3.ytimg.com',
      'i4.ytimg.com',
      'img.youtube.com'
    ],
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enable static HTML export
  trailingSlash: true,
};

module.exports = nextConfig;
