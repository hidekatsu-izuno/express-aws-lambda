import express from 'express';
import util from 'util';

export default function(req, res, next) {
    if (/(^|\/)\.+(\/|$)/.test(req.path)) {
        res.status(400).end();
        next();
        return;
    }

    const subpath = req.path.endsWith('/') ? req.path + 'index' : req.path;
    let subModule;
    try {
        subModule = require(`./api${subpath}.js`);
    } catch (err) {
        if (err.code !== 'MODULE_NOT_FOUND') {
            next(err);
            return;
        }
        res.status(404).end();
        next();
        return;
    }

    const middleware = subModule[req.method.toLowerCase()] || subModule.default;
    if (!middleware) {
        res.status(404).end();
        next();
        return;
    }

    const router = express.Router();
    router.use(subpath, middleware);
    router(req, res, next);
};
