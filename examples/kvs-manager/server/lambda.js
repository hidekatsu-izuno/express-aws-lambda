const express = require('express');
const apiDispatcher = require('./api_dispatcher').default;

const app = express();

app.use(apiDispatcher);

exports.handler = require('express-aws-lambda')(app);