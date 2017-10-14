/**
 * Created by bolin on 14-10-2017.
 */
describe('homepage',function () {
    describe('show homepage', function () {
        var url = 'localhost:3000/';

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })
});

describe('Show Users API', function () {
    describe('Show all users', function () {
        var url = 'localhost:3000/api/users/';

        it("returns status 200", function(done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Show 1 user', function () {
        var url = 'localhost:3000/api/users/DavidHollegien';

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })
});

describe('Show Films API', function () {
    describe('Show all films', function () {
        var url = 'localhost:3000/api/films';

        it("returns status 200",function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    });

    describe('Show 1 film', function () {
        var url = 'localhost:3000/api/films/test123';

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })
});

describe('Account',function () {
    describe('Registrate new account', function () {
        var url = 'localhost:3000/api/users/register';

        it("returns status 201",function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(201);
                done();
            })
        })
    });

    describe('login with existing account', function () {
        var url = 'localhost:3000/api/login/authenticate';

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })
});

