const common = require('./webpack.common');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        port: 3000,
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
});
