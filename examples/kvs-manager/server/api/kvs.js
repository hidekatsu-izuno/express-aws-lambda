import express from 'express';
import AWS from 'aws-sdk';
import dynamodbOptions from '../dynamodb_options';

const router = express.Router();
const dynamodb = new AWS.DynamoDB(dynamodbOptions);

router.get('/', (req, res, next) => {
    const key = req.query.key;

    dynamodb.scan({
        TableName: "KvsManager"
    }, (err, data) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        console.log(data);
        const list = data.Items.map(item => {
            return {
                key: item.Key.S,
                value: item.Value.S
            }
        });
        res.json(list);
        next();
    });
});

router.post('/', async (req, res) => {
    const item = req.body;

    await dynamodb.putItem({
        TableName: 'KvsManager',
        Item: {
            Category: { S: item.category },
            Key: { S: item.key },
            Value: { S: item.value }
        },
        'ConditionExpression': (item.mode === 'insert') ? 
            'attribute_not_exists(Category)' :
            'attribute_exists(Category)'
    }).promise();

    res.status(201)
        .end();
});

router.delete('/', async (req, res) => {
    res.status(201)
        .end();
});

export default router;