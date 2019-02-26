/*!
 * express-aws-lambda
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const stream = require('stream');

function ServerResponse() {
    stream.Writable.call(this);

    this._statusCode = 200;
    this._statusMessage = undefined;
    this._headers = {};
    this._data = [];
}
Object.setPrototypeOf(ServerResponse.prototype, stream.Writable.prototype);
Object.setPrototypeOf(ServerResponse, stream.Writable);

Object.defineProperty(ServerResponse.prototype, 'statusCode', {
    get: function() {
        return this._statusCode;
    },
    set: function(value) {
        this._statusCode = value;
    }
});

Object.defineProperty(ServerResponse.prototype, 'statusMessage', {
    get: function() {
        return this._statusMessage;
    },
    set: function(value) {
        this._statusMessage = value;
    }
});

ServerResponse.prototype.setHeader = function setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
};

ServerResponse.prototype.getHeader = function getHeader(name) {
    return this._headers[name.toLowerCase()];
};

ServerResponse.prototype.removeHeader = function removeHeader(name) {
    delete this._headers[name.toLowerCase()];
};

ServerResponse.prototype.getHeaders = function getHeaders() {
    return Object.assign({}, this._headers);
};

ServerResponse.prototype._write = function _write(chunk) {
    this._data.push(chunk);
};

ServerResponse.prototype._getResult = function _getResult() {
    const result = {};
    result.statusCode = this.statusCode;
    if (this.statusMessage) {
        result.statusDescription = this.statusMessage;
    }
    result.headers = {};
    result.isBase64Encoded = true;
    Object.keys(this._headers).forEach(key => {
        let value = this._headers[key];
        if (Array.isArray(value)) {
            value = value.join(', ');
        } else {
            value = String(value);
        }
        result.headers[key] = value;

        if (key === 'content-type') {
            const contentType = value.split(';');
            if (contentType[1]) {
                if (/^\s*charset\s*=\s*utf-8\s*/i.test(contentType[1])) {
                    result.isBase64Encoded = false;
                }
            } else if (/^\s*application\/json\s*$/i.test(contentType[0])) {
                result.isBase64Encoded = false;
            }
        }
    });
    result.body = Buffer.concat(this._data)
        .toString(result.isBase64Encoded ? 'base64' : 'utf-8');
    return result;
};

module.exports = ServerResponse;