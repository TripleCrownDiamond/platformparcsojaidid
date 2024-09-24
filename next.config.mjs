/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'efficient-apparel-56013b6060.media.strapiapp.com',
        pathname: '/**',  // Autorise tous les chemins sous ce domaine
      },
    ],
  },
};

export default nextConfig;
