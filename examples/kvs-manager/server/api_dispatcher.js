import express from 'express';
import util from 'util';

export default async function(req, res) {
    try {
        if (/(^|\/)\.+(\/|$)/.test(req.path)) {
            res.status(400).end();
            return;
        }
    
        const subpath = req.path.endsWith('/') ? req.path + 'index' : req.path;
        let subModule;
        try {
            subModule = require(`./api${subpath}.js`);
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw err;
            }
            res.status(404).end();
            return;
        }
    
        const middleware = subModule[req.method.toLowerCase()] || subModule.default;
        if (!middleware) {
            res.status(404).end();
            return;
        }
    
        const router = express.Router();
        router.use(subpath, middleware);
        return await util.promisify(router)(req, res);
    } catch (err) {
        res.status(500)
            .json({
                message: err.message
            })
            .end();
    }
};
