const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserJSPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Load extracted and minified CSS in head
                    {
                        loader: 'css-loader',   // 2. Turns css into commonjs
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },
                    'sass-loader' // 1. Turns scss to css
                ]
            }
        ]
    },

});