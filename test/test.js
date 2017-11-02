/**
 * Created by bolin on 14-10-2017.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
const supertest = require('supertest');
var server = require('../index');
var should = chai.should();
var jwt = require('jsonwebtoken');
chai.use(chaiHttp);
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvYmVydFN0b3JtIiwiaWF0IjoxNTA3OTg4Mjg4fQ.27sbcELl6YRgabQ6AuG3nEAYXiDnVrTZDJC46VUfQGU';

var userRouter = require('../routing/userRouter');
var User = userRouter.User;

describe('User', function (err) {
    // /api/users : Alle users ophalen
    it('should show all users', function (done) {
        chai.request(server).get('/api/users').set({'authorization': token}).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            // res.should.be.json;
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('achternaam');
            res.body[0].should.have.property('tussenvoegsels');
            res.body[0].should.have.property('voornaam');
            res.body[0].should.have.property('username');
            res.body[0].should.have.property('wachtwoord');
            done();
        })
    });
    // Users opvragen zonder rechten
    it('should show no users because user is not logged in', function (done) {
        chai.request(server).get('/api/users').end(function (err, res) {
            res.should.have.status(401);
            done();
        })
    });
    // /api/users/:UserName : specifieke user ophalen
    it('should show a single user with the requested username', function (done) {
        chai.request(server).get('/api/users/RobertStorm').set({'authorization': token}).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            res.body.should.have.property('achternaam');
            res.body.should.have.property('tussenvoegsels');
            res.body.should.have.property('voornaam');
            res.body.should.have.property('username');
            res.body.should.have.property('wachtwoord');
            done();
        })
    });
    //Opvragen niet-bestaande gebruiker
    it('should not show any user when a non-existing user is requested', function (done) {
        chai.request(server).get('/api/users/IkBestaNiet').set({'authorization': token}).end(function (err, res) {
            res.should.have.status(404);
            done();
        })
    });
    //Opvragen gebruiker zonder rechten
    it('should not show any user when user is not logged in', function (done) {
        chai.request(server).get('/api/users/RobertStorm').end(function (err, res) {
            res.should.have.status(401);
            done();
        })
    });
    // /api/users/register : Registreren
    it('should create a new user', function (done) {
        chai.request(server).post('/api/users/register/').send({
            username: 'newuser' + (Math.random() * (999999) + 1), //Om kans op 409 bij toekomstige test uit te roeien
            password: 'hallowereld',
            achternaam: 'bij',
            voornaam: 'aart'
        }).end(function (err, res) {
            res.should.have.status(201);
            done();
        })
    });
    //Registreren zonder username
    it('should not create a new user because no username was given', function (done) {
        chai.request(server).post('/api/users/register/').send({
            password: 'hallowereld',
            achternaam: 'bij',
            voornaam: 'aart'
        }).end(function (err, res) {
            res.should.have.status(400);
            done();
        })
    });
    //Registreren zonder password
    it('should not create a new user because no password was given', function (done) {
        chai.request(server).post('/api/users/register/').send({
            username: 'newuser123',
            achternaam: 'bij',
            voornaam: 'aart'
        }).end(function (err, res) {
            res.should.have.status(400);
            done();
        })
    });
    //Registreren zonder achternaam
    it('should not create a new user because no last name was given', function (done) {
        chai.request(server).post('/api/users/register/').send({
            username: 'newuser123',
            password: 'hallowereld',
            voornaam: 'aart'
        }).end(function (err, res) {
            res.should.have.status(400);
            done();
        })
    });
    //Registreren zonder voornaam
    it('should not create a new user because no first name was given', function (done) {
        chai.request(server).post('/api/users/register/').send({
            username: 'newuser123',
            password: 'hallowereld',
            achternaam: 'bij'
        }).end(function (err, res) {
            res.should.have.status(400);
            done();
        })
    });
    //Registreren al bestaande gebruiker
    it('should not create a new user because username already exists', function (done) {
        chai.request(server).post('/api/users/register/').send({
            username: 'RobertStorm',
            password: 'hallowereld',
            achternaam: 'bij',
            voornaam: 'aart'
        }).end(function (err, res) {
            res.should.have.status(409);
            done();
        })
    });
});

var filmRouter = require('../routing/filmRouter');
var Film = filmRouter.Film;

describe('Film', function (err) {
    it('should show all films', function (done) {
        chai.request(server)
            .get('/api/films')
            // .set({'authorization': token})
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.should.be.json;
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('titel');
                res.body[0].should.have.property('datum');
                res.body[0].should.have.property('lengte');
                res.body[0].should.have.property('regisseur');
                res.body[0].should.have.property('beschrijving');
                res.body[0].should.have.property('gem_beoordeling');
                done();
            })
    });
    it('should show film with requested film title', function (done) {
        chai.request(server)
            .get('/api/films/tygui/')
            // .set({'authorization': token})
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.should.be.json;
                res.body.should.have.property('_id');
                res.body.should.have.property('titel');
                res.body.should.have.property('datum');
                res.body.should.have.property('lengte');
                res.body.should.have.property('regisseur');
                res.body.should.have.property('beschrijving');
                done();
            })
    });
    it('should not show any film when requested film title doesn*t exist', function (done) {
        chai.request(server)
            .get('/api/films/theBigNonExistingFilm/')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });
    it('should show all the ratings from a film, posted by the current user', function (done) {
        chai.request(server)
            .get('/api/films/tygui/ratings/')
            .set({'authorization': token})
            .end(function (err, res) {
                res.should.have.status(200);
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('sterren');
                res.body[0].should.have.property('username');
                res.body[0].should.have.property('film_title');
                done();
            })
    });
    it('should not show any ratings, because of non-existing film', function (done) {
        chai.request(server)
            .get('/api/films/theBigNonExistingFilm/ratings/')
            .set({'authorization': token})
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });
    it('should not show any ratings, because of not being logged in', function (done) {
        chai.request(server)
            .get('/api/films/tygui/ratings/')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            })
    });
    it('should not show any ratings, because of no ratings posted', function (done) {
        chai.request(server)
            .get('/api/films/test/ratings/')
            .set({'authorization': token})
            .end(function (err, res) {
                // res.should.have.status(404);
                res.should.have.status(200);
                res.should.not.have.property('_id');
                done();
            })
    });
    it('should show average rating of the requested film', function (done) {
        chai.request(server)
            .get('/api/films/tygui/averageRating/')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body[0].should.be.a('number');
                done();
            })
    });
    it('should not show average rating of a non-existing film', function (done) {
        chai.request(server)
            .get('/api/films/theBigNonExistingFilm/averageRating/')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });
});

var ratingRouter = require('../routing/ratingRouter');
var Rating = ratingRouter.Rating;

describe('Rating', function (err) {
    it('should show all the users* ratings', function (done) {
        chai.request(server)
            .get('/api/ratings/')
            .set({'authorization': token})
            .end(function (err, res) {
                res.should.have.status(200);
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('sterren');
                res.body[0].should.have.property('username');
                res.body[0].should.have.property('film_title');
                done();
            })
    });
    it('should not show any ratings, because of being unauthorized', function (done) {
        chai.request(server)
            .get('/api/ratings/')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            })
    });
    it('should not show any ratings, because no ratings are posted', function (done) {
        chai.request(server)
            .get('/api/ratings/')
            .set({'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJpYXQiOjE1MDk2MTc4NTN9.aU-JOrZhb0MCERE00Z-Z2Efo13_RXWs4IaRO0xK_s5Q'}) //Different token because of user with no posted ratings
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });
});

var authRouter = require('../routing/authentication');
