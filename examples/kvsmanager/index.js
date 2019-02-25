/*!
 * express-serverless
 * Copyright(c) 2019 Hidekatsu Izuno <hidekatsu.izuno@gmail.com>
 * MIT Licensed
 */

'use strict';

const express = require('express');
const app = express();
const esm = require('esm')(module);

app.use(express.json());
app.use(function dispatch(req, res, next) {
    if (/(^|\/)\.+(\/|$)/.test(req.path)) {
        return;
    }

    let module;
    try {
        module = esm(`./server${req.path.endsWith('/') ? req.path + 'index' : req.path}.js`);
    } catch(e) {
        res.status(404);
        return;
    }

    const middleware = module[req.method.toLowerCase()] || module.default;
    if (middleware) {
        middleware(req, res, next);
    } else {
        return;
    }
});
app.use(express.static('static'));

exports.handler = require('express-aws-lambda')(app);

