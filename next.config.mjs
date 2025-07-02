/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        // port: '',
        // pathname: '/account123/**',
        // search: '?v=1727111025337',
      },
    ],
  },
};

export default nextConfig;
