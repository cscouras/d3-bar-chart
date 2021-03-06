const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
    inject: "body"
})

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
}
