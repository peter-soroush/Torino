/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
