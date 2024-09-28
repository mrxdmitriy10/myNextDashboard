/** @type {import('next').NextConfig} */



const nextConfig = {
  
  reactStrictMode: false,
    logging: {
      fetches: {
        fullUrl: true,
      },
    },


    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'flowbite.com',
            port: '',
            pathname: '/docs/images/**',
          },
        ],
      },

};

export default nextConfig;

