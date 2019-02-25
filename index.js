/*!
 * express-aws-lambda
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const debug = require('debug')('express-aws-lambda');
const request = require('express/lib/request');
const response = require('express/lib/response');
const IncomingMessage = require('./lib/incoming_message');
const ServerResponse = require('./lib/server_response');

Object.getOwnPropertyNames(request).forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(request, name);
    Object.defineProperty(req, name, desc);
});

Object.getOwnPropertyNames(response).forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(response, name);
    Object.defineProperty(res, name, desc);
});

module.exports = function serverless(app) {
    app.request = Object.create(request, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    app.response = Object.create(response, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    return function handler(event, context, callback) {
        debug("event: %o", event);
        const req = new IncomingMessage(event);
        const res = new ServerResponse();

        let err = null;
        app.handle(req, res, _err => {
            err = _err;
        });
    
        if (err != null) {
            debug("err: %o", err);
            callback(err, null);
        } else {
            const result = res._getResult();
            debug("result: %o" + result);
            callback(null, result);
        }
    };
}