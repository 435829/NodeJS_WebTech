var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('private-key', 'super-secret-key');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//USER ROUTER
var userRouter = require('./userRouter.js');
app.use('/api/users/', userRouter.router);
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
    //
    // var newUser1 = new User({
    //     achternaam: 'Storm',
    //     tussenvoegsels: 'van',
    //     voornaam: 'Robert',
    //     username: 'RobertStorm',
    //     wachtwoord: 'test12'
    // });
    // newUser1.save();
    //
    // var newUser2 = new User({
    //     achternaam: 'Bolink',
    //     tussenvoegsels: 'niks',
    //     voornaam: 'Robin',
    //     username: 'RobinBolink',
    //     wachtwoord: 'test12123123'
    // });
    // newUser2.save();
    //
    // var newUser3 = new User({
    //     achternaam: 'Bruijn',
    //     tussenvoegsels: 'de',
    //     voornaam: 'Joran',
    //     username: 'JorandeBruijn',
    //     wachtwoord: 'bruintje'
    // });
    // newUser3.save();
    //
    // var newUser4 = new User({
    //     achternaam: 'Hollegien',
    //     tussenvoegsels: 'niks',
    //     voornaam: 'David',
    //     username: 'DavidHollegien',
    //     wachtwoord: 'david'
    // });
    // newUser4.save();
    //
    // var newUser5 = new User({
    //     achternaam: 'Vincent',
    //     tussenvoegsels: 'van',
    //     voornaam: 'Overvelde',
    //     username: 'vinnie',
    //     wachtwoord: 'aardbei'
    // });
    // newUser5.save();
    //
    // var newUser6 = new User({
    //     achternaam: 'Scholten',
    //     tussenvoegsels: 'van',
    //     voornaam: 'Tim',
    //     username: 'TimScholten',
    //     wachtwoord: 'scholt'
    // });
    // newUser6.save();
    //
    // var newUser7 = new User({
    //     achternaam: 'aardbei',
    //     tussenvoegsels: 'van',
    //     voornaam: 'banaan',
    //     username: 'banenen',
    //     wachtwoord: 'aardbei'
    // });
    // newUser7.save();
    //
    // var newUser8 = new User({
    //     achternaam: 'Tafel',
    //     tussenvoegsels: 'van',
    //     voornaam: 'Stoel',
    //     username: 'TafelMetStoel',
    //     wachtwoord: 'tafelstoel'
    // });
    // newUser8.save();
    //
    // var newUser9 = new User({
    //     achternaam: 'Bord',
    //     tussenvoegsels: 'van',
    //     voornaam: 'appel',
    //     username: 'appelBord',
    //     wachtwoord: 'peer'
    // });
    // newUser9.save();
    //
    // var newUser10 = new User({
    //     achternaam: 'laptop',
    //     tussenvoegsels: 'van',
    //     voornaam: 'pc',
    //     username: 'pcLaptop',
    //     wachtwoord: 'lappie'
    // });
    // newUser10.save();

}


