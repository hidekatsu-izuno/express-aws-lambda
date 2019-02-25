const IncomingMessage = require('./incoming_message');
const request = require('express/lib/request');

const req = Object.create(IncomingMessage.prototype);

module.exports = req;

[
    'get',
    'header',
    'accepts',
    'acceptsEncodings',
    'acceptsEncoding',
    'acceptsCharsets',
    'acceptsCharset',
    'acceptsLanguages',
    'acceptsLanguage',
    'range',
    'param',
    'is'
].forEach(name => {
    if (request[name]) {
        req[name] = request[name];
    }
});

[
    'protocol',
    'secure',
    'ip',
    'ips',
    'subdomains',
    'path',
    'hostname',
    'host',
    'fresh',
    'stale',
    'xhr'
].forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(request, name);
    if (desc) {
        Object.defineProperty(req, name, desc);
    }
});


