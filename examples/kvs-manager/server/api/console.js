import express from 'express';
import AWS from 'aws-sdk';
import dynamodbOptions from '../dynamodb_options';

const router = express.Router();
const dynamodb = new AWS.DynamoDB(dynamodbOptions);

router.get('/', async (req, res) => {
    const result = await dynamodb.describeTable().promise();
    console.log(result);
});

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            if (req.body.method === 'createTable') {
                const params = Array.isArray(req.body.params) ? req.body.params[0] :
                    req.body.params;
                await dynamodb.createTable(params).promise();
            }
        }
        
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                message: err.message
            })
            .end();
    }
});

export default router;