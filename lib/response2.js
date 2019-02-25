const ServerResponse = require('./server_response');
const response = require('express/lib/response');

const res = Object.create(ServerResponse.prototype);

module.exports = res;

[
    'status',
    'links',
    'send',
    'json',
    'jsonp',
    'sendStatus',
    'sendFile',
    'sendfile',
    'download',
    'contentType',
    'type',
    'format',
    'attachment',
    'append',
    'set',
    'header',
    'get',
    'clearCookie',
    'cookie',
    'location',
    'redirect',
    'vary',
    'render'
].forEach(name => {
    if (request[name]) {
        req[name] = request[name];
    }
});
