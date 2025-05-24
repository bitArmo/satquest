import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Enable CSS modules
  experimental: {
    optimizeCss: true,
  },
  // Ensure PostCSS and Tailwind are properly configured
  webpack: (config, { isServer }) => {
    // Add PostCSS loader
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [
                'tailwindcss',
                'autoprefixer',
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
