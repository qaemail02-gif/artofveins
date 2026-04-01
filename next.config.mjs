/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained build artefact suitable for Docker / cloud deployment.
  // The .next/standalone directory contains everything needed to run the server.
  output: "standalone",

  // Internationalization — locales are handled via [locale] route segment + middleware
  // No built-in i18n block needed for App Router

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },

  // Strict React mode
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Allow cross-origin requests from the same origin during development
  allowedDevOrigins: ["localhost"],

  // Experimental features
  experimental: {
    // Optimise CSS output (works with Tailwind CSS v4)
    optimizeCss: true,
  },
};

export default nextConfig;
