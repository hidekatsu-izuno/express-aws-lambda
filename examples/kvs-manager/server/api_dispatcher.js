import express from 'express';

const router = express.Router();

router.use('/api', async function(req, res) {
    if (/(^|\/)\.+(\/|$)/.test(req.path)) {
        return;
    }

    let subModule;
    try {
        subModule = require(`./api${req.path.endsWith('/') ? req.path + 'index' : req.path}.js`);
    } catch (err) {
        if (err.code !== 'MODULE_NOT_FOUND') {
            throw err;
        }
        return;
    }

    const middleware = subModule[req.method.toLowerCase()] || subModule.default;
    if (middleware && middleware.length === 2) {
        await middleware(req, res);
    } else if (middleware && middleware.length === 3) {
        await middleware(req, res, next);
    }
});

export default router;