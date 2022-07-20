const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack : {
    resolve: {
      extensions:['.vue', '.js', '.json'],
      // 配置别名
      // alias: {
      //   'assets':'@/assets',
      //   'commmon':'@/commmon',
      //   'components':'@/components',
      //   'network':'@/network',
      //   'views':'@/views'
      // }
    }
  }
})
