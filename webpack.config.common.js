const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		main: ['./src'],
		vendor: ['react']
	},
	output: {
		sourceMapFilename: '[name].js.map',
		path: path.resolve('build'),
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.(jpe?g|png|gif|svg)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path]/[name].[ext]'
					}
				}]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: true,
							importLoader: 2
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: ['./node_modules/bootstrap/scss']
						}
					}
				]
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					doctype: 'html',
					pretty: true,
					compileDebug: true,
					self: false
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/templates/index.pug',
			filename: 'admin.html',
			templateParameters: {
				title: 'Admin'
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	]
};
