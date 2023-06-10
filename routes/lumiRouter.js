const express = require('express')
const router = express.Router()
const lumiController = require('../controllers/lumiController')

//Get all data
router.get('/', async (req, res) => {
    const data = await lumiController.getData()
    res.json(data)
});

//create a new data
router.post('/create', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await lumiController.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

module.exports = router