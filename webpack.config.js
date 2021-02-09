const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: "./src/main.ts",
	output: {
		filename: "./bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "development",
	devtool: "inline-source-map",
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["ts-loader"],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		host: "localhost",
		port: 3000,
		historyApiFallback: true,
		open: true,
	},
};
