import { join } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var APP_ROOT = 'app';

var entries = [
    './' + APP_ROOT + '/client',
	'webpack-dev-server/client?http://localhost:3000',
	'webpack/hot/dev-server'
];

var loaders = [
    {
        test: /\.scss$/,
        loader: 'style!css?modules!sass',
        include: join(__dirname, APP_ROOT)
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: join(__dirname, APP_ROOT)
    }
];

var plugins = [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
	template: './' + APP_ROOT + '/index.html',
    favicon: './' + APP_ROOT + '/favicon.png'
	})
];

export const devtool = 'source-map';
export const entry = entries;
export const output = {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js'
};

export const module = {
    loaders: loaders
};
export const devServer = {
    contentBase: './dist',
    hot: true
};