import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Allows image uploads up to ~4 MB from the admin panel (Vercel's limit is 4.5 MB).
    serverActions: { bodySizeLimit: '4mb' },
  },
};

export default nextConfig;
