const express = require('express');
const router = express.Router();
const auth0 = require ('../objects/auth0');

const jwtAuthz = require('express-jwt-authz');

router.post('/getUsers', jwtAuthz([ 'users:read' ]), (req, res, next) => {
    auth0.getUsers(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/getUser',  jwtAuthz([ 'users:read' ]), (req, res, next) => {
    auth0.getUser(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/updateUser',  jwtAuthz([ 'users:read', 'users:write' ]), (req, res, next) => {
    auth0.updateUser(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/getRoles',  jwtAuthz([ 'roles:read' ]), (req, res, next) => {
    auth0.getRoles(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

router.post('/setUsersStripeCustomerId',  jwtAuthz([ 'roles:read' ]), (req, res, next) => {
    auth0.setUsersStripeCustomerId(req)
        .then (function (result) {
            res.json(result);
        }, function (error) {
            res.status(error.statusCode).json(error);
        });
});

module.exports = router;
