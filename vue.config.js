const path = require('path')
const { resolve } = require('path')

module.exports = {
  // 打包文件夹的名字
  outputDir: process.env.VUE_APP_OUTPUT_DIR,

  // 开发环境服务
  devServer: {
    // 开发环境跨域配置
    proxy: {
      /**
       * /api开头的请求会先把/api重写为'',然后再指向target地址
       */
      '/api': {
        target: 'http://192.168.100.235:9095', // target指向需要请求的地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 但实际上接口是没有api的，这只是你用来区分请求的一个别名，这时pathRewrite就可以将/api去掉
        }
      },
      
      /**
       * 如果没有接口管理的需求,可以使用下面这个取巧的方法
       */
      '/': {
        target: 'http://192.168.100.235:9095', // target指向需要请求的地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  /**
   * 使用less全局变量
   */
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/styles/variable.less')
      ]
    }
  },

  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}