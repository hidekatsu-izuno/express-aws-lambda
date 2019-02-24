/*!
 * express-serverless
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const stream = require('stream');
const url = require('url');

function IncomingMessage(event) {
    stream.Readable.call(this);

    this.method = event.httpMethod || 'GET';
    this.headers = {};
    if (event.headers) {
        Object.keys(event.headers)
            .forEach(key => {
                headers[key.toLowerCase()] = event.headers[key];
            });
    }
    this.url = url.format({
        protocol: headers['x-forwarded-proto'] || 'http',
        hostname: headers['host'] || 'localhost',
        port: parseInt(headers['x-forwarded-port'], 10) || 80,
        pathname: event.path,
        query: event.multiValueQueryStringParameters || event.queryStringParameters
    });
    if (event.body) {
        this.push(Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8'));
    }

    this.connection = {};
    this.connection.encrypted = (headers['x-forwarded-proto'] === 'https');
    this.connection.remoteAddress = (headers['x-forwarded-for'] || '').split(',').pop();
}
Object.setPrototypeOf(IncomingMessage.prototype, stream.Readable.prototype);
Object.setPrototypeOf(IncomingMessage, stream.Readable);

module.exports = IncomingMessage;