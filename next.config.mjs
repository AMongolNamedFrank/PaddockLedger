/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.topps.com"
      },
      {
        protocol: "https",
        hostname: "**.fanatics.com"
      },
      {
        protocol: "https",
        hostname: "**.ebayimg.com"
      }
    ]
  }
};

export default nextConfig;
