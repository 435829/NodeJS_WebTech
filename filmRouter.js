var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;
var ratingModule = require('./ratingRouter');
var Rating = ratingModule.Rating;

var jwt = require('jsonwebtoken');

var film = new Schema({
    imdb_number: Number,
    titel: String,
    datum: String,
    lengte: Number,
    regisseur: String,
    beschrijving: String
});
var Film = mongoose.model('Film', film);

/**
 * Een get methode om alle films te laten zien
 */
router.get('/', function (req, res) {
    Film.find({}, function (err, films) {
        var i = 0;

        var filmMap = {};

        films.forEach(function (film) {
            filmMap[i] = film;
            i++;
        });

        res.status(200);
        res.send(filmMap);
    });
    // res.json("films");
});

/**
 * Een get methode om een film te laten zien die bij de meegegeven film titel hoort
 */
router.get('/:filmtitle', function (req, res) {
    var filmTitle = req.param('filmtitle');
    Film.findOne({titel: filmTitle}, function (err, film) {
        if (!film) {
            res.status(404).send("film not found");
        }
        res.status(200);
        res.send(film);
    });
    // res.json("films");

});

/**
 * Een get methode die alle ratings ophaalt die bij de meegegeven film titel horen
 */
router.get('/:filmtitle/ratings', function (req, res) {
    var filmTitle = req.param('filmtitle');

    Film.findOne({titel: filmTitle}, function (err, film) {
        if (!film) {
            res.status(404).send("film not found");
        } else {
            var dec_token = req.headers['authorization'];
                // decoded;

                jwt.verify(dec_token, 'super-secret-key', function (err, decoded) {
                    if (err) {
                        return res.status(401).send('unauthorized');
                    } else {
                        Rating.find({film_title: filmTitle}, function (err, ratings) {
                            if (err) {
                                res.status(401).send('Something went wrong');
                            } else if (!ratings) {
                                res.status(404).send('No ratings found');
                            } else {
                                var i = 0;
                                var ratingMap = {};

                                ratings.forEach(function (rating) {
                                    ratingMap[i] = rating;
                                    i++;
                                });
                                res.status(200).send(ratingMap);
                            }
                        })
                    }
                });
            }
    });

});


module.exports = router;
module.exports.Film = Film;