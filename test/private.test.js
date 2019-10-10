process.env.DOTENV_PATH = './environments/.env.dev';
process.env.MOCHA_TESTS = 'true';

const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect  = require('chai').expect;
const should = chai.should();
const assert = require('assert');
const request = require('request');
const server = require ('./../app');

const auth0TestClient = require('./auth0.credentials.test');

let jwtToken;

describe('Private Rest Endpoints', function() {
    before(async () => {
        // runs before all tests in this block
        jwtToken = await auth0TestClient.getTestToken();
    });

    describe('Private GET', function() {
        it('Should return 401', function(done) {
            chai.request(server)
                .get('/rest/private/')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    done();                               // <= Call done to signal callback end
                });
        });

        it('Should return 200', function(done) {
            chai.request(server)
                .get('/rest/private/')
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });

    describe('Private PUT', function() {
        it('Should return 401', function(done) {
            chai.request(server)
                .post('/rest/private/')
                .send( {
                    test: 'value'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    done();                               // <= Call done to signal callback end
                });
        });
        it('Should return 200', function(done) {
            chai.request(server)
                .post('/rest/private/')
                .send( {
                    test: 'value'
                })
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
});
