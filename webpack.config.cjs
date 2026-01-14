const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')

const { DefinePlugin } = require('webpack')

const env = dotenv.config().parsed

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		]
	},
	plugins: [
		new DefinePlugin({
			'process.env': JSON.stringify(env)
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	resolve: {
		plugins: [require('pnp-webpack-plugin')]
	},
	resolveLoader: {
		plugins: [require('pnp-webpack-plugin').topLevel]
	},
	devServer: {
		static: './dist',
		port: 4200,
		open: true,
		historyApiFallback: true
	},
	mode: 'development'
}
