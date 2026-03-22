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
            value: `default-src 'self'; connect-src 'self' ${apiOrigin} https://api.stripe.com https://*.stripe.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://*.stripe.com; style-src 'self' 'unsafe-inline'; frame-src https://js.stripe.com https://*.stripe.com https://hooks.stripe.com;`,          },
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

