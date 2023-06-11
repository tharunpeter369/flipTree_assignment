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
        const user = await lumiController.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

//opt generate
router.post('/otpGenerate', async (req, res) => {
    const { phone_number } = req.body;
    try {
        const user = await lumiController.generateOtp({ phone_number });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

//opt verification
router.post('/otpVerification', async (req, res) => {
    const { otp , phone_number } = req.body;
    try {
        const verify = await lumiController.verifyOtp(req.body);
        res.status(201).json(verify);
    } catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
});

module.exports = router