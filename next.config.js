/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hostaway-platform.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/listing/**",
      },
      {
        protocol: "https",
        hostname: "backendy.azurewebsites.net",
        port: "",
        pathname: "/api/categories/**",
      },
    ],
  },
};

export default config;
