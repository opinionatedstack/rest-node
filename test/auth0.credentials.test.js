
const request = require('request');
const testConstants = require ('./test.constants');

var tokenTMAuth0MgmtAPI;
var tokenTMAuth0MgmtAPIDateTime;
var tokenAuth0AuthExtension;
var tokenAuth0AuthExtensionDateTime;

module.exports = {
    getTestToken: () => {
        return new Promise(function (resolve, reject) {
            if (tokenTMAuth0MgmtAPI) {
                if (Date.now() - tokenTMAuth0MgmtAPIDateTime < 600000) {
                    return resolve(tokenTMAuth0MgmtAPI);
                }
            }

            var options = {
                method: 'POST',
                url: process.env.AUTH0_DOMAIN + '/oauth/token',
                headers: {'content-type': 'application/json'},
                body: {
                    client_id: testConstants.client_id,
                    client_secret: testConstants.client_secret,
                    audience: testConstants.audience,
                    grant_type: 'password',
                    username: testConstants.username,
                    password: testConstants.password,
                    scope: testConstants.requestedScopes
                },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) {
                    return reject(error);
                } else if ('statusCode' in response && response.statusCode !== 200) {
                    const e = new Error('Auth0 Error: ' + response.body.error_description);
                    e.data = response.body;
                    e.statusCode = response.statusCode;
                    return reject(e);
                }

                tokenTMAuth0MgmtAPIDateTime = Date.now();
                tokenTMAuth0MgmtAPI = body;
                return resolve(body);
            });
        });
    }
}

