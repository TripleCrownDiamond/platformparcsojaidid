/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '1337', // Assurez-vous que le port correspond à celui de votre serveur Strapi
          pathname: '/uploads/**',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '1337',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  