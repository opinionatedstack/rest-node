const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    try {
        const result = {
            message: 'Sucessful public GET',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString())
        };
        res.json(result);
    } catch (e) {
        res.status(500).json({ statusCode: 500, message: e.message });
    }
});

router.post('/', function (req, res, next) {
    try {
        const result = {
            message: 'Successful public POST',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString()),
            echoedData: req.body
        };
        res.json(result);
    } catch (e) {
        res.status(500).json({ statusCode: 500, message: e.message });
    }
});

router.get('/generatesError', function (req, res, next) {
    try {
        const result = {
            message: 'This public GET should fail',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString())
        };
        nonExistantObject.nonExistantFunction();
        res.json(result);
    } catch (e) {
        res.status(500).json({ statusCode: 500, message: e.message });
    }
});

module.exports = router;
