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
      {
        protocol: "http",
        hostname: "backendy.eastus.cloudapp.azure.com",
        port: "",
        pathname: "/api/categories/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image-cdn.timesharesoft.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pictures.lodgix.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "azureblobimg.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default config;
