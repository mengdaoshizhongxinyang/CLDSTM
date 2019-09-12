const webpack = require('webpack')
const vueCliServices = require('@vue/cli-service')
const { resolve } = require('path')
/** @type vueCliServices.ProjectOptions */
const options = {
  configureWebpack: {},
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
  },
  css: {
    loaderOptions: {
      less: {
        // TODO
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 7777
  },
  productionSourceMap: false,
  transpileDependencies: []
};
module.exports = options