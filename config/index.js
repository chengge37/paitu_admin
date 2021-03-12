'use strict'
const path = require('path')

module.exports = {
    dev: {

        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/adminapi': {
//              target: 'http://0.0.0.0:9527',
                   target: 'http://192.168.0.2:9527',
                changeOrigin: true,//传递给后端正确的Host头 true:target host、 false为localhost
                secure: true //支持 https
            },
            '/api': {
//           target: 'http://0.0.0.0:9527',
				target:'http://192.168.0.2:9527',
//				target:'https://www.paitume.com',
                changeOrigin: true,//传递给后端正确的Host头 true:target host、 false为localhost
                secure: true //支持 https
            }
        },
        devtool: 'cheap-module-eval-source-map',
        host: '0.0.0.0',
        port: 1114,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // 此处决定打包的文件夹
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        /**
         * 打包时是否启用map
         */

        productionSourceMap: false,
        devtool: '#source-map',

        // 此处配置是是否启动webpack打包检测你可以通过使用以下命令进行启动
        // `npm run build --report`
        // 或者你也可以直接设置true或者false来直接进行控制
        bundleAnalyzerReport: process.env.npm_config_report,
        // 此处配置可使用插件自动配置需要cdn加速的模块
        cdn: false
    }
}
