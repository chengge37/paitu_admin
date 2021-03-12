const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require("../config")
const portfinder = require('portfinder')
const utils = require('./utils')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const options = merge(common, {
    mode: 'development',
    devtool: config.dev.devtool,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: ['vue-style-loader', 'css-loader', 'stylus-loader', {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: [
                            path.resolve(__dirname, 'src/common/stylus/variable.styl'),
                            path.resolve(__dirname, 'src/common/stylus/mixin.styl')
                        ],
                        injector: (source, resources) => {
                            const combineAll = type => resources
                                .filter(({ file }) => file.includes(type))
                                .map(({ content }) => content)
                                .join('');

                            return combineAll('variable') + combineAll('mixin') + source;
                        }
                    }
                }]
            }
        ]
    },
    output: {
        filename: '[name].js',
    },
    devServer: {
        clientLogLevel: 'warning',
        // 当使用history出现404时则自动调回index页
        historyApiFallback: true,
        contentBase: path.join(__dirname, "../dist"),
        // 热加载模式
        hot: true,
        // 启用gzip
        compress: false,
        // 设置webpack热加载地址
        host: HOST || config.dev.host,
        // 设置webpack热加载端口
        port: PORT || config.dev.port,
        // 设置是否自动打开浏览器
        open: config.dev.autoOpenBrowser,
        // 当编译器出现错误时，在全屏覆盖显示错误位置
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        // 从config文件中读取端口代理设置
        proxy: config.dev.proxyTable,
        // 启用简洁报错
        quiet: true,
        // 启用监听文件变化
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.development.html',
            chunksSortMode: 'none',
            inject: 'body',
            favicon: 'src/favicon.ico',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            options.devServer.port = port
            options.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`您的项目已成功启动`],
                    notes: [`本机访问请在vscode的终端中按住左ctrl键点击: http://127.0.0.1:${port} \n `, `局域网访问地址: http://${utils.getNetworkIp()}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))

            resolve(options)
        }
    })
})
