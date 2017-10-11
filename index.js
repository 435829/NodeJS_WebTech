var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//USER ROUTER
var userRouter = require('./userRouter.js');
app.use('/api/users/', userRouter);
//RATING ROUTER
var ratingRouter = require('./ratingRouter.js');
app.use('/api/ratings/', ratingRouter);
//FILM ROUTER
var filmRouter = require('./filmRouter.js');
app.use('/api/films/', filmRouter);

var mongodbUri = "mongodb://Robinbolink:abcd12@ds163034.mlab.com:63034/robindb";
var options = {
    useMongoClient: true,
    // socketTimeout: 0,
    keepAlive: true,
    reconnectTries: 30
};

//db.on db.once(hier alle code in), op internet kijken

var db = mongoose.connect(mongodbUri, options);
console.log("test");
{
// // respond with "hello world" when a GET request is made to the homepage

    app.get('/', function (req, res) {
        res.send('Hello World!')
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });
//
//

//Film object aangemaakt met verschillende variabelen
    var film = new Schema({
        imdb_number: Number,
        titel: String,
        datum: String,
        lengte: Number,
        regisseur: String,
        beschrijving: String
    });

//User object aangemaakt met verschillende variabelen
    var user = new Schema({
        achternaam: String,
        tussenvoegsels: String,
        voornaam: String,
        username: String,
        wachtwoord: String
    });

    var Film = mongoose.model('Film', film);
    var User = mongoose.model('User', user);


    var rating = new Schema({
        sterren: Number,
        username: String,
        imdb_number: Number
    });

    var Rating = mongoose.model('Rating', rating);


    var newFilm = new Film({
        imdb_nummer: 1234,
        titel: 'test',
        datum: '01-09-2017',
        lengte: 20,
        regisseur: 'Robin Bolink',
        beschrijving: 'Leuke film'
    });

    newFilm.save(function (err, result) {
        if (err) {
            return console.error(err);
        } else {

        }
    });

}


