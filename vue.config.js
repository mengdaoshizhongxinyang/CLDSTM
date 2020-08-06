const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const vuecli= require('@vue/cli-service')
const options = {
    publicPath: './',
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        plugins: [
            new MonacoWebpackPlugin({
                // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
                languages: ['javascript', 'css', 'html', 'typescript', 'json'],
                output: "./static/js/monaco-editor"
            })
        ],
        externals: {
          'configs': 'configs',
        }
    },

    chainWebpack: (config) => {
        config.module.rule('md')
            .test(/\.md/)
            .use('text-loader')
            .loader('text-loader')
            .options({
                raw: true
            })
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
        port: 8100
    },
    productionSourceMap: false,
    transpileDependencies: []
};
module.exports = options