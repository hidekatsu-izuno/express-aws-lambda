const express = require('express');
const cors = require('cors');
const apiDispatcher = require('./api_dispatcher').default;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', apiDispatcher);

exports.handler = require('express-aws-lambda')(app);