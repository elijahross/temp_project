/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.chucknorris.io',
            pathname: '**',
          },
         ]
        },
};

export default nextConfig;
