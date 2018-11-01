"use strict"
const path = require('path');

module.exports = {
    entry: "./src/main.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'        
    },
    devServer: {
        contentBase: path.join(__dirname, "src"), 
        port: 1237

    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname,"node_modules")],
                use: [ 'script-loader' ]
            },
            {
                test: /\.css?$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                loader: 'url-loader'
            }
        ]
    }
}