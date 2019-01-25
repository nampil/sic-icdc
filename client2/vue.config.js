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
  }
}
