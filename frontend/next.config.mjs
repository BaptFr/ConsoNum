/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async headers() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiOrigin = new URL(apiUrl).origin;

    if (!apiUrl) {
      throw new Error("Critical error: NEXT_PUBLIC_API_URL environment variable is missing.");
    }
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; connect-src 'self' ${apiOrigin}; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';`,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

