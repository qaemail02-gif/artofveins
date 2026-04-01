import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel runs the Next.js server natively — no special output mode needed.
  // (removing output:"export" re-enables SSR, API routes, and image optimisation)

  reactStrictMode: true,

  images: {
    // Image optimisation is handled by Vercel — keep it enabled (remove unoptimized)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
