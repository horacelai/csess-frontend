module.exports = function override(config, env) {
  //do stuff with the webpack config...
  /*
  const swPrecacheConfig = config.plugins.find(
    plugin => plugin.constructor.name === "SWPrecacheWebpackPlugin"
  );
  // Prevent some URLs from being cached by the service worker
  swPrecacheConfig.options.navigateFallbackWhitelist = [/^\/#\//];
  swPrecacheConfig.options.dontCacheBustUrlsMatching = /\.\w{8}\./;
  */
  return config;
}
