const express = require('express');
const apiDispatcher = require('./api_dispatcher').default;

const app = express();

app.use(express.json());
app.use('/api', apiDispatcher);

exports.handler = require('express-aws-lambda')(app);