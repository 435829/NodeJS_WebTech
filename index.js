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
//AUTHENTICATION ROUTER
var authRouter = require('./authentication');
app.use('/api/login', authRouter);

var mongodbUri = "mongodb://Robinbolink:abcd12@ds163034.mlab.com:63034/robindb";
var options = {
    useMongoClient: true,
    // socketTimeout: 0,
    keepAlive: true,
    reconnectTries: 30
};

app.get('/api/users', function (req, res) {

    console.log('show all users');
});

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


//User object aangemaakt met verschillende variabelen


    var rating = new Schema({
        sterren: Number,
        username: String,
        imdb_number: Number
    });

    var Rating = mongoose.model('Rating', rating);


    // var newFilm = new Film({
    //     imdb_nummer: 1234,
    //     titel: 'test',
    //     datum: '01-09-2017',
    //     lengte: 20,
    //     regisseur: 'Robin Bolink',
    //     beschrijving: 'Leuke film'
    // });

    // var newFilm2 = new Film({
    //     imdb_nummer: 12,
    //     titel: 'test123',
    //     datum: '10-10-2017',
    //     lengte: 10,
    //     regisseur: 'Robert Storm',
    //     beschrijving: 'Saaie film'
    // });
    // newFilm2.save();
    //
    // var newFilm3 = new Film({
    //     imdb_nummer: 24,
    //     titel: 'aardbij',
    //     datum: '10-12-2017',
    //     lengte: 1,
    //     regisseur: 'Joran Storm',
    //     beschrijving: 'film'
    // });
    // newFilm3.save();
    //
    // var newFilm4 = new Film({
    //     imdb_nummer: 23,
    //     titel: 'testje',
    //     datum: '14-09-2017',
    //     lengte: 2,
    //     regisseur: 'David test',
    //     beschrijving: 'piraten film'
    // });
    // newFilm4.save();
    //
    // var newFilm5 = new Film({
    //     imdb_nummer: 45,
    //     titel: 'tygui',
    //     datum: '23-2-2017',
    //     lengte: 56,
    //     regisseur: 'David Storm',
    //     beschrijving: 'Mooie film'
    // });
    // newFilm5.save();
    //


}


