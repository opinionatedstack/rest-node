process.env.DOTENV_PATH = './environments/.env.dev';
process.env.MOCHA_TESTS = 'true';

const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect  = require('chai').expect;
const should = chai.should();
const assert = require('assert');
const request = require('request');
const server = require ('./../app');

describe('Public Rest Endpoints', function() {
    describe('Public GET', function() {
        it('Should return 200', function(done) {
            chai.request(server)
                .get('/rest/public/')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });

        it('Should return be object', function(done) {
            chai.request(server)
                .get('/rest/public/')
                .end(function(err, res) {
                    res.body.should.be.a('object');
                    res.body.message.should.be.eq('Sucessful public GET');
                    done();                               // <= Call done to signal callback end
                });
        });
    });

    describe('Public PUT', function() {
        it('Should return 200', function(done) {
            chai.request(server)
                .post('/rest/public/')
                .send( {
                    test: 'value'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });

        it('Should return be object', function(done) {
            chai.request(server)
                .post('/rest/public/')
                .send( {
                    test: 'value'
                })
                .end(function(err, res) {
                    res.body.should.be.a('object');
                    res.body.echoedData.test.should.be.eq('value');
                    done();                               // <= Call done to signal callback end
                });
        });
    });

    describe('Erroneous PUT', function() {
        it('Should return 500', function(done) {
            chai.request(server)
                .get('/rest/public/generatesError')
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
});
