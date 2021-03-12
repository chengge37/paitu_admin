const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('../config')
const utils = require('./utils')

const common = require('./webpack.common.js');
const options = merge(common, {
    mode: 'production',
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        // publicPath: '/',//可配置cdn缓存文件地址
    },
    externals: {
        jquery: 'jQuery',
        vue: 'Vue',
        'element-ui': 'ELEMENT',
        'socket.io-client': 'io'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //use previous loader sourceMap
                            sourceMap: config.build.productionSourceMap
                        }
                    }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //use previous loader sourceMap
                            sourceMap: config.build.productionSourceMap
                        }
                    },
                    'sass-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //use previous loader sourceMap
                            sourceMap: config.build.productionSourceMap
                        }
                    },
                    'stylus-loader',
                    {
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
    optimization: {
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                vendor: { // 将第三方模块提取出来
                    minSize: 30000,
                    minChunks: 1,
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 1
                },
                commons: {
                    test: /[\\/]src[\\/]common[\\/]/,
                    name: 'commons',
                    minSize: 30000,
                    minChunks: 3,
                    chunks: 'initial',
                    priority: -1,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        },
        runtimeChunk: { name: 'runtime' },
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                sourceMap: config.build.productionSourceMap,
                terserOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']
                    },
                }
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })]
    },
    plugins: [
        new CleanWebpackPlugin( { 
            exclude: ['.user.ini'] }
        ),
        new MiniCssPlugin({
            filename: utils.assetsPath('css/[name].css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
        }),
        // Reduces bundles total size
        new webpack.HashedModuleIdsPlugin(),//only update files which has changed
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.production.html',
            inject: 'body',
            favicon: 'src/favicon.ico',
            chunksSortMode: 'none',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true
            }
        })
    ],
    stats: {
        // 显示所有模块
        maxModules: Infinity,
        // 显示模块为何被引入
        reasons: true,
    }
});
// 当config中对应项为true时，启用打包检查
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    options.plugins.push(new BundleAnalyzerPlugin())
}
// if (config.build.cdn) {
//     const WebpackCdnPlugin = require('webpack-cdn-plugin');
//     options.plugins.push(new WebpackCdnPlugin({
//         modules: [{
//             name: 'vue',
//             cdn: 'https://cdn.bootcss.com/',
//             path: 'dist/vue.runtime.min.js'
//         }]
//     }))
// }
module.exports = options;
