const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
	entry: {
		main: ['./src']
	},
	output: {
		sourceMapFilename: '[name].js.map',
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: ''
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules'
		],
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/images/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|TTF)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/fonts/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.css$/,
				exclude: path.join(__dirname, '/node_modules/bxslider'),
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, '/node_modules/bxslider'),
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							alias: {
								'./images': '../images'
							}
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoader: 0
						}
					},
					{
						loader: 'sass-loader'
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
					debug: true,
					self: false
				}
			}
		]
	},
	plugins: [
		// pages start
		new HtmlWebpackPlugin({
			template: './src/templates/index.pug',
			filename: 'index.html',
			inject: 'body',
			root: 'src/',
			templateParameters: {
				title: 'My Page'
			}
		}),
		// pages end
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new FaviconsWebpackPlugin({
			logo: 'assets/images/icon128.png',
			prefix: 'assets/images/icons-[hash]/',
			emitStats: true,
			statsFilename: 'iconstats-[hash].json',
			persistentCache: true,
			inject: true,
			title: 'Webpack App',
			// favicon options
			path: '/',												// Path for overriding default icons path. `string`
			appName: 'My Progressive Web App',						// Your application's name. `string`
			appDescription: 'My awesome Progressive Web App!',		// Your application's description. `string`
			developerName: null,			// Your (or your developer's) name. `string`
			developerURL: null,				// Your (or your developer's) URL. `string`
			dir: 'auto',					// Primary text direction for name, short_name, and description
			lang: 'en-US',					// Primary language for name and short_name
			background: '#fff',				// Background colour for flattened icons. `string`
			theme_color: '#fff',			// Theme color user for example in Android's task switcher. `string`
			display: 'standalone',			// Preferred display mode: 'fullscreen', 'standalone', 'minimal-ui' or 'browser'. `string`
			orientation: 'any',				// Default orientation: 'any', 'natural', 'portrait' or 'landscape'. `string`
			start_url: '.',					// Start URL when launching the application from a device. `string`
			version: '1.0',					// Your application's version string. `string`
			logging: false,					// Print logs to console? `boolean`
			icons: {
				// Platform Options:
				// - offset - offset in percentage
				// - background:
				//   * false - use default
				//   * true - force use default, e.g. set background for Android icons
				//   * color - set background for the specified icons
				//
				android: true,				// Create Android homescreen icon. `boolean` or `{ offset, background }`
				appleIcon: true,			// Create Apple touch icons. `boolean` or `{ offset, background }`
				appleStartup: true,			// Create Apple startup images. `boolean` or `{ offset, background }`
				coast: true,				// Create Opera Coast icon. `boolean` or `{ offset, background }`
				favicons: true,				// Create regular favicons. `boolean`
				firefox: true,				// Create Firefox OS icons. `boolean` or `{ offset, background }`
				windows: true,				// Create Windows 8 tile icons. `boolean` or `{ background }`
				yandex: true				// Create Yandex browser icon. `boolean` or `{ background }`
			}
		})
	],
	optimization: {
		splitChunks: {
			automaticNameDelimiter: '_',
			chunks: 'all'
		}
	}
};
