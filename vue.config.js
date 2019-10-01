const options = {
    publicPath: './',
    configureWebpack: {
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
        port: 8080
    },
    productionSourceMap: false,
    transpileDependencies: []
};
module.exports = options