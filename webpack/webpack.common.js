const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config')
const utils = require('./utils')
const webpackbar = require('webpackbar')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].bundle.js'),
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.js$/,
            include: [resolve('src')],
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            ),
            use: {
                loader: 'babel-loader?cacheDirectory=true'
            }
        },
        {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('src/icons/svg')],
            options: {
                symbolId: 'icon-[name]'
            }
        },
        {
            test: /\.(gif|png|jpe?g|svg)(\?.*)?$/,
            exclude: [resolve('src/icons/svg')],
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: utils.assetsPath('img/[name]-[hash:8]-yuanben.[ext]')
                }
            }]
        }, {
            test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: utils.assetsPath('fonts/[name]-[hash:8]-yuanben.[ext]')
            }
        }
        ]
    },
    plugins: [
        new webpackbar({
            name: "paitume-front",
        }),
        new VueLoaderPlugin(),
        //set global variables
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            "$": "jquery",
            "jQuery": "jquery"
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '~': resolve('node_modules'),
            'static': resolve('static'),
            "@components": resolve("src/views/components"),
            "@commonComponents": resolve("src/components"),
            "@images": resolve("src/assets/images"),
            "@css": resolve("src/assets/css"),
            "@js": resolve("src/assets/js"),
            '@util': resolve('src/util'),
            '@config': resolve('src/config'),
        }
    },
};