const SWPrecache = require('sw-precache-webpack-plugin')

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/graphql',
        ws: true,
        changeOrigin: true
      }
    }
  },

  configureWebpack: {
    plugins: [
      new SWPrecache({
        cacheId: 'sicIcdc',
        filepath: '/service-worker.js',
        staticFileGlobs: [
          '/index.html',
          '/manifest.json',
          '/*.{js,css}'
        ],
        stripPrefix: '/'
      })
    ]
  },

  baseUrl: '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}