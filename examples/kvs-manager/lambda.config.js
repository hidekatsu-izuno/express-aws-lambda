const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'server/lambda.js'),
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'index.js'
    },
    target: 'node',
    plugins: [
        new ZipPlugin({
            path: path.resolve(__dirname, 'dist'),
            filename: 'kvs-manager-api.zip',
            include: [ /\.js$/ ]
        })
    ]
};