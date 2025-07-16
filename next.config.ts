import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // Disable SVGO completely
          },
        },
      ],
    });

    return config;
  },
};

export default withContentlayer(nextConfig);