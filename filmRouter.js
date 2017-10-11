var express = require('express');
var mongoose = require('mongoose');
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

        res.send(filmMap);
    });
    // res.json("films");

});

router.get('/:IMDB', function (req, res) {
    var imdbReq = req.param('IMDB');
    Film.find({imdb_number: imdbReq}, function (err, films) {
        var i = 0;

        var filmMap = {};

        films.forEach(function(film) {
            filmMap[i] = film;
            i++;
        });

        res.send(filmMap);
    });
    // res.json("films");

});



module.exports = router;