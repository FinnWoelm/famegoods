const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  target: 'serverless',
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    /*
    if (!isServer) {
      config.resolve.mainFields = config.resolve.mainFields || [];
      config.resolve.mainFields.push("browser");

      config.mainFields = config.mainFields || [];
      config.mainFields.push("browser");
    }*/
    // config.externals = config.externals || [];
    // config.externals.push("browser");
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // if (config.resolve.mainFields.indexOf("browser") === -1) {
    
    //// config.resolve.alias["https"] = false; // "https-browserify";
    //// config.resolve.alias["http"] = false; // "http-browserify";
    
    // } else {

    // }
    // config.resolve.mainFields = config.resolve.mainFields || [];
    // config.resolve.mainFields = ["browser", ...config.resolve.mainFields];

    // console.log("config", config);
    // console.log(JSON.stringify(config.resolve));

    //// config.resolve.alias.string_decoder = false; // "string_decoder";
    //// config.resolve.alias["geturl"] = "browser-geturl";
    //}

    // Important: return the modified config
    return config;
  },
});
