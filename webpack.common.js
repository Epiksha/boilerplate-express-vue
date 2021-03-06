const { VueLoaderPlugin } = require('vue-loader');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { join } = require('path');
const webpack = require('webpack');
require('dotenv').config({ path: '.frontend.env'});

module.exports = {
    entry: [
        '@babel/polyfill',
        './src/entry.js',
    ],

    output: {
        filename: 'bundle.js',
        path: join(__dirname, 'public'),
    },

    plugins: [
        new VueLoaderPlugin(),
        new SpriteLoaderPlugin(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.vue/,
                use: ['vue-loader'],
            },
            {
                enforce: 'pre',
                test: /\.(vue|js)/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    'svg-sprite-loader',
                    'svgo-loader',
                ],
            },
            {
                test: /\.(woff|ttf|eot|jpe?g|png|vtt|webp|ttf|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                    },
                },
            },
        ],
    },
};