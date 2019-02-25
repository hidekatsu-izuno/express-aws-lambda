/*!
 * express-serverless
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const IncomingMessage = require('./lib/incoming_message');
const ServerResponse = require('./lib/server_response');
const request = require('./lib/request');
const response = require('./lib/response');

module.exports = function serverless(app) {
    app.request = Object.create(request, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    app.response = Object.create(response, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    });

    return function handler(event, context, callback) {
        console.log("event: " + JSON.stringify(event));
        const req = new IncomingMessage(event);
        const res = new ServerResponse();

        let processed = false;
        app.handle(req, res, (error) => {
            const result = res._getResult();
            console.log("result: " + JSON.stringify(result));
            callback(error, result);
            processed = true;
        });
    
        if (!processed) {
            const result = res._getResult();
            console.log("result: " + JSON.stringify(result));
            callback(null, result);
        }
    };
}