
const request = require('request');

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
                    client_id: 'wWfj3qRYjgQ9KQU5e3NQQ1E05GzWhO3J',
                    client_secret: 'FqdNfqRYDAu_2Igs3e7nyvfiU2Y9BV3BXf1nXm3rdgQ5_XRApiuwRpDh34VuC-TA',
                    audience: 'https://test.opinionatedstack.com',
                    grant_type: "client_credentials"
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

