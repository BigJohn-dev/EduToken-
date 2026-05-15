/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
};

module.exports = nextConfig;
