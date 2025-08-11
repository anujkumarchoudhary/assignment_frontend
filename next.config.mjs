/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com' // 👈 add Cloudinary
    ],
  },
};

export default nextConfig;
