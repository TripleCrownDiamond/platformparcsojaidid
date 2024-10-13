/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smart-baseball-ed4db8eac7.media.strapiapp.com',
        pathname: '/**',  // Autorise tous les chemins sous ce domaine
      },
    ],
  },
};

export default nextConfig;
