/*!
 * express-aws-lambda
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
        next();
        return;
    }

    let module;
    try {
        module = esm(`./server${req.path.endsWith('/') ? req.path + 'index' : req.path}.js`);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            next();
        } else {
            next(err);
        }
        return;
    }

    const middleware = module[req.method.toLowerCase()] || module.default;
    try {
        if (middleware && middleware.length === 2) {
            middleware(req, res);
            next();
        } else if (middleware && middleware.length === 3) {
            middleware(req, res, next);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

if (process.env.NODE_ENV === 'development') {
    const chokidar = require('chokidar');
    chokidar.watch('./server/').on('all', () => {
        Object.keys(esm.cache).forEach(id => {
            if (/[\/\\]server[\/\\]/.test(id)) {
                delete esm.cache[id];
            }
        });
    });

    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
} else {
    exports.handler = require('express-aws-lambda')(app);
}

