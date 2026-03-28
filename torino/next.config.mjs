/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/static/images/**",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
