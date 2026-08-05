import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The live WordPress site uses these paths. Keep inbound links —
    // and anything already shared on Instagram — working.
    return [
      {
        source: "/collaberations",
        destination: "/collaborations",
        permanent: true,
      },
      { source: "/contact-me", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
