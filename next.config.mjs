/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/NextGuard-hk/**',
      },
      {
        protocol: 'https',
        hostname: 'next-guard.com',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
