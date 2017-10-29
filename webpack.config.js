const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin-webpack-2');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

const rootAssetPath = './src/assets';

const babelLoader = {
    test    : /\.jsx?$/,
    exclude : /(node_modules|bower_components)/,
    loader  : 'babel-loader',

    query: {
        presets : ['react', 'es2015']
    }
};

module.exports = {
    entry: {
        app_js: [
            rootAssetPath + '/entry.js'
        ]
    },

    output: {
        publicPath: 'http://localhost:2992/assets/',
        filename: 'app.min.js'
    },
    resolve: {
        extensions: ['.js', '.css']
    },

    watch: true,

    module: {
        loaders: [ babelLoader ]
    },
    plugins: [
       // new ExtractTextPlugin('[name].[chunkhash].css'),
        new ManifestRevisionPlugin(path.join('src/build', 'manifest.json'), {
            rootAssetPath: rootAssetPath
        })
    ]
};
