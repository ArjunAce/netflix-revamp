const path = require('path');
const commonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 3. Inject styles into DOM
                    {
                        loader: 'css-loader',   // 2. Turns css into commonjs
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                localIdentName: "[name]_[local]"
                            },
                        }
                    },
                    'sass-loader' // 1. Turns scss to css
                ]
            }
        ]
    }
});