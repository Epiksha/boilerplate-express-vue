const { VueLoaderPlugin } = require('vue-loader');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { join } = require('path');

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
                test: /\.(woff|ttf|eot|jpe?g|png|vtt|webp)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/',
                    },
                },
            },
        ],
    },
};