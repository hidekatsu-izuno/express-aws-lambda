const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'server/lambda.js'),
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: {
        'aws-sdk': 'aws-sdk'
    },
    plugins: [
        new ZipPlugin({
            path: path.resolve(__dirname, 'dist'),
            filename: 'kvs-manager-api.zip',
            include: [ /\.js$/ ]
        })
    ]
};