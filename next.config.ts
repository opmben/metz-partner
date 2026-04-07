import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Allow local project screenshot images
    unoptimized: false,
  },
}

export default nextConfig
