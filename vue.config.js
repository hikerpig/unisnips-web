const path = require('path')

const resolve = (...list) => {
  return path.resolve(__dirname, ...list)
}

module.exports = {
  configureWebpack() {
    return {
      resolve: {
        alias: {
          src: resolve('src')
        }
      },
      externals: {
        'highlight.js': 'hljs'
      }
    }
  },
  transpileDependencies: [
    "vuetify"
  ],
  pwa: {
    themeColor: '#FBC02D',
  },
  devServer: {
    allowedHosts: [
      "unisnips-web.local-dev.com"
    ]
  }
}
