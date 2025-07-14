import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config: Configuration) => {
    // Find and modify the default file loader rule for `.svg` files
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        typeof rule !== "string" &&
        !!rule &&
        rule.test instanceof RegExp && // Ensure `test` is a RegExp
        rule.test.test(".svg") // Check if the RegExp matches `.svg`
    );

    if (fileLoaderRule && "exclude" in fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/; // Exclude `.svg` files from the default file loader
    }

    // Add SVGR loader for `.svg` files
    config.module?.rules?.push({
      test: /\.svg$/, // Target `.svg` files
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true, // Enable SVG optimization
            svgoConfig: {
              plugins: [
                { removeViewBox: false }, // Preserve `viewBox` for responsiveness
                { cleanupIDs: true },     // Remove IDs to avoid duplication issues
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default withContentlayer(nextConfig);