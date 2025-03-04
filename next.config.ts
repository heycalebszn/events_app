/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler:{
    removeConsole:process.env.NODE_ENV === 'production'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      }
    ],
  },
};

module.exports = nextConfig;
