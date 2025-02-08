/** @type {import('next').NextConfig} */
const nextConfig = {
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
  transpilePackages: ['leaflet', 'react-leaflet'],
  webpack: (config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
};

module.exports = nextConfig;
