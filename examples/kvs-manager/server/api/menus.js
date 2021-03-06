import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        {
            id: 'MENU_1', type: 'section', text: 'Tables', children: [
                { id: 'MENU_1_1', text: 'Sample', route: { name: 'kvs_list', params: { category: 'sample' } } }
            ]
        }
    ]);
});

export default router;