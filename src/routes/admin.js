const express = require('express');
const router = express.Router();
const auth0 = require ('./../objects/auth0');

router.post('/getUsers', function (req, res, next) {
    auth0.getUsers(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/getUser', function (req, res, next) {
    auth0.getUser(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/updateUser', function (req, res, next) {
    auth0.updateUser(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/getRoles', function (req, res, next) {
    auth0.getRoles(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

module.exports = router;
