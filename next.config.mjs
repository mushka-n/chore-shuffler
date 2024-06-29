/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/week-shuffle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
