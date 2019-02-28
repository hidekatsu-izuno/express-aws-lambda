# express-aws-lambda

This library is a express.js extension for AWS Lambda and ALB.
You can run your web application for the express.js on AWS Lambda.

This is simillar to [aws-serverless-express](https://github.com/awslabs/aws-serverless-express). 
But this implementation don't use a socket.

## Getting Started

```bash
npm install express-aws-lambda
```

```js
'use strict';

const express = require('express');
const app = express();

app.use(express.json());
app.use(function (req, res) {
    // You can access to lambda arguments
    console.log(req.platform.event);
    console.log(req.platform.context);

    res.json({
        message: "Hello world!"
    });
});

exports.handler = require('express-aws-lambda')(app);
```

You have to use a API Gateway or a Application Load Balancer with your lambda application when you want to use this module.

