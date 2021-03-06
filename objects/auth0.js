
var request = require("request");

var tokenTMAuth0MgmtAPI;
var tokenTMAuth0MgmtAPIDateTime;
var tokenAuth0AuthExtension;
var tokenAuth0AuthExtensionDateTime;

module.exports = {
    getUsers: (req) => {
        return new Promise (function (resolve, reject) {

            let query = '';
            if (req.body.searchTerms.email) {
                query = query + 'email:"' + req.body.searchTerms.email + '";';
            }

            getTokenTMAuth0MgmtAPI().then(function (token) {

                var options = { method: 'GET',
                    url: process.env.AUTH0_DOMAIN + '/api/v2/users',
                    qs:
                        {
                            q: query,
                            //sort: 'created_at:1',
                            search_engine: 'v3',
                            page: req.body.pageIndex,
                            per_page: req.body.pageSize,
                            include_totals: true
                        },
                    headers: { authorization: 'Bearer ' + token.access_token }
                };

                request(options, function (error, response, body) {
                    if (error) { return reject(error); }

                    if (body.statusCode && body.statusCode != 200) { return reject(body); }

                    return resolve(body);
                });
            }, function (error) {
                return reject(error);
            });
        });
    },

    getUser: (req) => {
        return new Promise ( (resolve, reject) => {
            getTokenTMAuth0MgmtAPI().then(function (token) {

                var options = { method: 'GET',
                    url: process.env.AUTH0_DOMAIN + '/api/v2/users/' + req.body.user_id,
                    headers: { authorization: 'Bearer ' + token.access_token }
                };

                request(options, function (error, response, body) {
                    if (error) { return reject(error); }

                    if (body.statusCode && body.statusCode != 200) { return reject(body); }

                    return resolve(body);
                });
            }, function (error) {
                return reject(error);
            });
        });
    },

    updateUser: (req) => {
        return new Promise ( (resolve, reject) => {
            getTokenTMAuth0MgmtAPI().then(function (token) {
                // Copy user object into new object with only fields that can be updated per Auth0 Management API
                // Field list from https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id
                // x=0 is used as a NoOp function if field doesn't exist
                let x;
                const userUpdateBody = {};
                ('blocked' in req.body) ? userUpdateBody.blocked = req.body.blocked: x = 0;
                ('email_verified' in req.body) ? userUpdateBody.email_verified = req.body.email_verified: x = 0;
                ('email' in req.body) ? userUpdateBody.email = req.body.email: x = 0;
                ('phone_number' in req.body) ? userUpdateBody.phone_number = req.body.phone_number: x = 0;
                ('phone_verified' in req.body) ? userUpdateBody.phone_verified = req.body.phone_verified: x = 0;
                ('user_metadata' in req.body) ? userUpdateBody.user_metadata = req.body.user_metadata: x = 0;
                ('app_metadata' in req.body) ? userUpdateBody.app_metadata = req.body.app_metadata: x = 0;
                ('given_name' in req.body) ? userUpdateBody.given_name = req.body.given_name: x = 0;
                ('family_name' in req.body) ? userUpdateBody.family_name = req.body.family_name: x = 0;
                ('name' in req.body) ? userUpdateBody.name = req.body.name: x = 0;
                // req.body.nickname ? userUpdateBody.nickname = req.body.nickname: x = 0;
                ('picture' in req.body) ? userUpdateBody.picture = req.body.picture: x = 0;
                ('verify_email' in req.body) ? userUpdateBody.verify_email = req.body.verify_email: x = 0;
                ('verify_phone_number' in req.body) ? userUpdateBody.verify_phone_number = req.body.verify_phone_number: x = 0;
                ('password' in req.body) ? userUpdateBody.password = req.body.password: x = 0;
                ('connection' in req.body) ? userUpdateBody.connection = req.body.connection: x = 0;
                ('client_id' in req.body) ? userUpdateBody.client_id = req.body.client_id: x = 0;
                ('username' in req.body) ? userUpdateBody.username = req.body.username: x = 0;

                var options = { method: 'PATCH',
                    url: process.env.AUTH0_DOMAIN + '/api/v2/users/' + req.body.user_id,
                    body: userUpdateBody,
                    headers: {
                        authorization: 'Bearer ' + token.access_token,
                        'content-type': 'application/json'
                    },
                    json: true
                };

                request(options, function (error, response, body) {
                    if (error) { return reject(error); }

                    if (body.statusCode && body.statusCode != 200) { return reject(body); }

                    return resolve(body);
                });
            }, function (error) {
                return reject(error);
            });
        });
    },

    getRoles: (req) => {
        return new Promise ( (resolve, reject) => {

            let query = '';
            if (req.body.name_filter) {
                query = query + 'name_filter=' + req.body.name_filter + '';
            }


            getTokenTMAuth0MgmtAPI().then(function (token) {

                var options = { method: 'GET',
                    url: process.env.AUTH0_DOMAIN + '/api/v2/roles',
                    qs:
                        {
                            q: query,
                            //sort: 'created_at:1',
                            search_engine: 'v3',
                            page: req.body.pageIndex,
                            per_page: req.body.pageSize,
                            include_totals: true
                        },
                    headers: { authorization: 'Bearer ' + token.access_token }
                };

                request(options, function (error, response, body) {
                    if (error) { return reject(error); }

                    if (body.statusCode && body.statusCode != 200) { return reject(body); }

                    return resolve(body);
                });
            }, function (error) {
                return reject(error);
            });
        });
    }
};

function getTokenTMAuth0MgmtAPI() {
    return new Promise(function (resolve, reject) {
        if (tokenTMAuth0MgmtAPI) {
            if (Date.now() - tokenTMAuth0MgmtAPIDateTime < 600000) {
                return resolve(tokenTMAuth0MgmtAPI);
            }
        }

        var options = {
            method: 'POST',
            url:  process.env.AUTH0_DOMAIN + '/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: {
                client_id: process.env.AUTH0_MGMT_APPLICATION_CLIENT_ID,
                client_secret: process.env.AUTH0_MGMT_APPLICATION_CLIENT_SECRET,
                audience: process.env.AUTH0_DOMAIN + '/api/v2/',
                grant_type: "client_credentials"
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) {
                return reject(error);
            }

            else if ('statusCode' in response && response.statusCode !== 200) {
                const e = new Error('Auth0 Error: ' + response.body.error_description);
                e.data = response.body;
                e.statusCode = response.statusCode;
                return reject (e);
            }

            tokenTMAuth0MgmtAPIDateTime = Date.now();
            tokenTMAuth0MgmtAPI = body;
            return resolve(body);
        });
    });
}
