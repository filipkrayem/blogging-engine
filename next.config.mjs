await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  experimental: {
    esmExternals: false,
  },

  images: {
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
