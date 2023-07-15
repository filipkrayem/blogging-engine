await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  experimental: {
    esmExternals: false,
  },

  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
    ],
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
