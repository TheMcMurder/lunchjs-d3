/* eslint-env node */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		d3Paragraphs: './src/paragraphs/paragraphs.js'
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				loader: 'babel-loader',
			},
			{
				test: /\.(png|gif|svg)$/i,
				loader: 'url-loader'
			},
			{
				test: /\.css$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]',
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins() {
								return [
									require('autoprefixer')
								];
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, 'node_modules')],
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		modules: [
			__dirname,
			'node_modules',
		],
	},
	plugins: [
		new CleanWebpackPlugin(['sofe']),
		// new BundleAnalyzerPlugin({analyzerPort: 9091}),
	],
	devtool: 'source-map',
};

