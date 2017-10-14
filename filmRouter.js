var express = require('express');
var
    mongoose = require('mongoose');
var Schema = mongoose.Schema;
var router = express.Router();
var film = new Schema({
    imdb_number: Number,
    titel: String,
    datum: String,
    lengte: Number,
    regisseur: String,
    beschrijving: String
});
var Film = mongoose.model('Film', film);

router.get('/', function (req, res) {
    Film.find({}, function (err, films) {
        var i = 0;

        var filmMap = {};

        films.forEach(function(film) {
            filmMap[i] = film;
            i++;
        });

        res.status(200);
        res.send(filmMap);
    });
    // res.json("films");

});

router.get('/:filmtitle', function (req, res) {
    var filmTitle = req.param('filmtitle');
    Film.find({titel: filmTitle}, function (err, films) {
        var i = 0;

        var filmMap = {};

        films.forEach(function(film) {
            filmMap[i] = film;
            i++;
        });

        res.status(200);
        res.send(filmMap);
    });
    // res.json("films");

});



module.exports = router;
module.exports.Film = Film;