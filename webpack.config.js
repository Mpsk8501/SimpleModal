const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



const conf ={
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: "main.js",
        publicPath: "/dist"
    },

    devServer: {
        hot:true,
        overlay:true,
        historyApiFallback:true,
        disableHostCheck: true,
        port:9000,
       /* proxy: {
            '/serv/!**': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }*/
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: "[name].css"
            }
        ),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    ["@babel/plugin-proposal-class-properties", { "loose": true }]
                ]
            }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }, {
                    loader: 'postcss-loader',
                    options: {sourceMap: true, config: {path: `./postcss.config.js`}}
                }, {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }, {
                    loader: 'postcss-loader',
                    options: {sourceMap: true, config: {path: `./postcss.config.js`}}
                }
            ]
        }]
    },

};

module.exports = conf;