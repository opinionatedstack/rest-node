const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    try {
        const result = {
            message: 'Sucessful private GET',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString())
        };
        res.json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', function (req, res, next) {
    try {
        const result = {
            message: 'Successful private POST',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString()),
            echoedData: req.body
        };
        res.json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
