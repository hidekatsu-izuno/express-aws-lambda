/*!
 * express-serverless
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const express = require('express');
const app = express();
const esm = require('esm')(module);

app.use(express.static('static'));
app.use(express.json());
app.use(function dispatch(req, res, next) {
    if (/(^|\/)\.+(\/|$)/.test(req.path)) {
        return next();
    }

    let module;
    try {
        module = esm(`./server${req.path.endsWith('/') ? req.path + 'index' : req.path}.js`);
    } catch(e) {
        res.status(404);
        return next();
    }

    const middleware = module[req.method.toLowerCase()] || module.default;
    if (middleware) {
        try {
            if (middleware.length > 2) {
                middleware(req, res, next);
            } else {
                middleware(req, res);
                next();
            }
        } catch (err) {
            next(err);
        }
    }
});

exports.handler = require('express-aws-lambda')(app);

