const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    try {
        const result = {
            message: 'Sucessfully GETTED public: ',
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
            message: 'Successfully POSTED public: ',
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
            message: 'Sucessfully GETTED public: ',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString())
        };
        inexistantObject.inexistantFunction();
        res.json(result);
    } catch (e) {
        res.status(500).json({ statusCode: 500, message: e.message });
    }
});

module.exports = router;
