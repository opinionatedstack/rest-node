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


describe('Admin Rest Endpoints', function() {
    let firstUser;

    before(async () => {
        // runs before all tests in this block
        jwtToken = await auth0TestClient.getTestToken();
    });

    describe('Manage Users', function() {
        it('gets list of users', function(done) {
            chai.request(server)
                .post('/rest/admin/getUsers')
                .send({searchTerms: {}})
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    const b = JSON.parse(res.body);
                    if (b.users.length > 0) {
                        firstUser = b.users[0];
                    }
                    done();                               // <= Call done to signal callback end
                });
        }).timeout(5000); // Tests to run a little long

        it('gets single user', function(done) {
            if (!firstUser) { assert(false); done(); }

            chai.request(server)
                .post('/rest/admin/getUser')
                .send({ user_id: firstUser.user_id })
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);

                    done();                               // <= Call done to signal callback end
                });
        });

        it('updates user email_verified', function(done) {
            if (!firstUser) { assert(false); done(); }

            const old_email_verified = firstUser.email_verified;
            firstUser.email_verified = !firstUser.email_verified;

            chai.request(server)
                .post('/rest/admin/updateUser')
                .send(firstUser)
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.email_verified).to.be.eq(!old_email_verified);
                    done();                               // <= Call done to signal callback end
                });
        });

        it('returns user email_verified', function(done) {
            if (!firstUser) { assert(false); done(); }

            const old_email_verified = firstUser.email_verified;
            firstUser.email_verified = !firstUser.email_verified;

            chai.request(server)
                .post('/rest/admin/updateUser')
                .send(firstUser)
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.email_verified).to.be.eq(!old_email_verified);
                    done();                               // <= Call done to signal callback end
                });
        });

        it('get roles', function(done) {
            chai.request(server)
                .post('/rest/admin/getRoles')
                .send(firstUser)
                .set('Authorization', 'Bearer ' + jwtToken.access_token)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
});
