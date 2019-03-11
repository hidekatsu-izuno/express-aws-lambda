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

const req = Object.create(IncomingMessage.prototype);
Object.getOwnPropertyNames(request).forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(request, name);
    Object.defineProperty(req, name, desc);
});

const res = Object.create(ServerResponse.prototype);
Object.getOwnPropertyNames(response).forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(response, name);
    Object.defineProperty(res, name, desc);
});

module.exports = function serverless(app) {
    app.request = Object.create(req, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    app.response = Object.create(res, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    return async function handler(event, context) {
        debug("event: %o", event);
        const req = new IncomingMessage(event, context);
        const res = new ServerResponse();

        try {
            return await new Promise(function (resolve, reject) {
                app.handle(req, res, reject);
                const result = res._getResult();
                debug("result: %o", result);
                resolve(result);
            });
        } catch (err) {
            debug("error: %o", err);
            throw err;
        }
    };
}