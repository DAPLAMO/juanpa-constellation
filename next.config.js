/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  transpilePackages: ['three'],
  outputFileTracingRoot: path.join(__dirname),
}

module.exports = nextConfig
