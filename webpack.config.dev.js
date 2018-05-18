const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	performance: {
		hints: 'warning',
		maxEntrypointSize: Math.exp(2 ^ (20 * 10)),
		maxAssetSize: Math.exp(2 ^ (20 * 10))
	}
});
