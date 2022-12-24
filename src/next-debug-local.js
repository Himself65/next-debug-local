const path = require('node:path')

/**
 *
 * @param modules {Record<string, string>}
 * @param options {{
 *   enable: boolean
 * }}
 */
function withDebugLocalInitializer (modules, options) {
  if (modules == null || typeof modules !== 'object') {
    throw new TypeError()
  }
  if (typeof options.enable !== 'boolean') {
    throw new TypeError()
  }
  if (Object.values(modules).some(target => !path.isAbsolute(target))) {
    throw new TypeError()
  }
  const enable = options.enable
  /**
   * @template T
   * @param { T } nextConfig
   * @returns { T | undefined }
   */
  return function withDebugLocal(nextConfig = {}) {
    if (Object.keys(modules).length === 0) {
      return nextConfig
    }
    const packages = Object.keys(modules)
    const transpilePackages = [...packages]
    if (Array.isArray(nextConfig.transpilePackages)) {
      transpilePackages.push(...nextConfig.transpilePackages)
    }
    return Object.assign({}, nextConfig, {
      transpilePackages,
      webpack(config, options) {
        config.cache.version = `${config.cache.version}|debug-local=${enable}`
        if (enable) {
          config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx'],
          };
          Object.entries(modules).forEach((name, path) => {
            config.resolve.alias[name] = path
          })
        }
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }
        return config
      }
    })
  }
}

module.exports = withDebugLocalInitializer