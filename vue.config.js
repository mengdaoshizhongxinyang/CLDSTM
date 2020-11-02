const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const PrerenderSPAPlugin=require('prerender-spa-plugin')
const HtmlWebpackPlugin=require("html-webpack-plugin")
const path = require('path');
const Renderer=PrerenderSPAPlugin.PuppeteerRenderer
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
            }),
            // new PrerenderSPAPlugin({
            //     staticDir: path.join(__dirname, 'dist'),
            //     routes: [ '/', '/article' ],
            //     renderer: new Renderer({
            //       headless: false,
            //       renderAfterDocumentEvent: 'render-event'
            //     })
            // }),
        ],
        externals: {
          'configs': 'configs',
        }
    },
    pages:{
        index:{
            entry:'src/main.ts'
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
        config.resolve.extensions.add('.ts').add('.tsx')
        .end().end()
        .module
        .rule('typescript')
        .test(/\.tsx?$/)
        .use('babel-loader')
        .loader('babel-loader')
        .end()
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          transpileOnly: true,
          appendTsSuffixTo: [
            '\\.vue$',
          ],
          happyPackMode: false,
        })
        .end();
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