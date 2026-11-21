import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next only serves the image qualities listed here. 90 is for the portrait, which looked soft at the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
