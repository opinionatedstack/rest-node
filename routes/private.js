const express = require('express');
const router = express.Router();

const jwtAuthz = require('express-jwt-authz');

router.get('/',  (req, res, next) => {
    try {
        const result = {
            status: 'success',
            message: 'Sucessful private GET',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString())
        };
        res.json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/',  (req, res, next) => {
    try {
        const result = {
            status: 'success',
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

// These two permissions are not assigned to anyone in the demo site
router.post('/requireNeverPermission', jwtAuthz([ 'read:never', 'write:never' ]), (req, res, next) => {
    try {
        const result = {
            status: 'success',
            message: 'Successful private permissioned POST',
            dotEnvTestValue: process.env.SAMPLE_TEXT,
            dateTime: (new Date().toLocaleTimeString()),
            echoedData: req.body
        };
        res.json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Some users in the demo site have Post permissions
//
router.post('/requirePostPermission', jwtAuthz([ 'post:read', 'post:write' ]), (req, res, next) => {
    try {
        const result = {
            status: 'success',
            message: 'Successful private permissioned POST',
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
