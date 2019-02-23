/*!
 * express-serverless
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const stream = require('stream');

function ServerResponse() {
    stream.Writable.call(this);

    this.statusCode = 200;
    this.statusMessage = undefined;
    this.headers = {};
    this._data = [];
}
Object.setPrototypeOf(ServerResponse.prototype, stream.Writable.prototype);
Object.setPrototypeOf(ServerResponse, stream.Writable);

ServerResponse.prototype.setHeader = function setHeader(name, value) {
    this.headers[name.toLowerCase()] = value;
};

ServerResponse.prototype.getHeader = function getHeader(name) {
    return this.headers[name.toLowerCase()];
};

ServerResponse.prototype.removeHeader = function removeHeader(name) {
    delete this.headers[name.toLowerCase()];
};

ServerResponse.prototype.getHeaders = function getHeaders() {
    return Object.assign({}, this.headers);
};

ServerResponse.prototype._write = function _write(chunk) {
    this._data.push(chunk);
};

ServerResponse.prototype._getResult = function _getResult() {
    const result = {};
    result.statusCode = this.statusCode;
    result.multiValueHeaders = {};
    Object.keys(this.headers).forEach(key => {
        let value = this.headers[key];
        if (Array.isArray(value)) {
            value = value.map(value => String(value));
        } else {
            value = [ String(value) ];
        }
        result.multiValueHeaders[key] = value;
    });
    result.isBase64Encoded = true;
    result.body = Buffer.concat(this._data).toString('base64');
    return result;
};

module.exports = ServerResponse;