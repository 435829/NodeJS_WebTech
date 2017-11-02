var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var Router = express.Router();
var film = new Schema({
    imdb_number: Number,
    titel: String,
    datum: String,
    lengte: Number,
    regisseur: String,
    beschrijving: String
});

var Film = mongoose.model('Film', film);

var filmWithRating = new Schema({
    titel: String,
    datum: String,
    lengte: Number,
    regisseur: String,
    beschrijving: String,
    gem_beoordeling: Number
});
var FilmWithRating = mongoose.model('FilmWithRating', filmWithRating);


var ratingModule = require('./ratingRouter');
var Rating = ratingModule.Rating;

module.exports.Router = Router;
module.exports.Film = Film;

//============================================================================

/**
 * Een get methode om alle films te laten zien
 */
Router.get('/', function (req, res) {
    Film.find({}, function (err, films) {
        var filmMap = [];
        var supposedFilmMapPosSum = 0;
        var z = 0;
        var currentFilmMapPosSum = 0;
        films.forEach(function (err) {
                supposedFilmMapPosSum += z;
                z++;
            }
        );
        var i = 0;
        films.forEach(function (film) {
            var avgRating = 0;
            var j = i;
            Rating.find({film_title: film.titel}, function (err, ratings) {
                if (err) {
                } else if (!ratings) {
                    res.status(404);
                    console.log("HIEROEROEORER")
                } else {
                    console.log(j);
                    var fwr;
                    do {
                        var totalRating = 0;
                        var amountOfRatings = 0;
                        ratings.forEach(function (rating) {
                            totalRating += rating.sterren;
                            amountOfRatings++;
                        });
                        if (amountOfRatings > 0) {
                            avgRating = totalRating / amountOfRatings;
                        }
                        fwr = new FilmWithRating({
                            titel: film.titel,
                            datum: film.datum,
                            lengte: film.lengte,
                            regisseur: film.regisseur,
                            beschrijving: film.beschrijving,
                            gem_beoordeling: Math.round(avgRating, 0)
                        });
                        console.log(fwr);
                        filmMap[j] = fwr;
                        console.log(filmMap[j]);
                    } while (filmMap[j] === null);
                    currentFilmMapPosSum += j;
                    if (currentFilmMapPosSum === supposedFilmMapPosSum) {
                        res.send(filmMap);
                        res.status(200);
                    }
                }
            });
            i++;
        });

        // res.send(filmMap);


    });
    // res.json("films");
});

/**
 * Een get methode om een film te laten zien die bij de meegegeven film titel hoort
 */
Router.get('/:filmtitle', function (req, res) {
    var filmTitle = req.param('filmtitle');
    Film.findOne({titel: filmTitle}, function (err, film) {
        if (!film) {
            res.status(404).send("film not found");
        } else {
            res.status(200);
            res.send(film);
        }
    });
    // res.json("films");

});

/**
 * Een get methode die alle ratings ophaalt die bij de meegegeven film titel horen
 */
Router.get('/:filmtitle/ratings', function (req, res) {
    var filmTitle = req.param('filmtitle');

    Film.findOne({titel: filmTitle}, function (err, film) {
        if (!film) {
            res.status(404).send("film not found - /filmtitle/ratings");
        } else {
            var dec_token = req.headers['authorization'];

            try {
                jwt.verify(dec_token, 'super-secret-key', function (err, decoded) {
                    if (err) {
                        return res.status(401).send('unauthorized');
                    } else {
                        var username = decoded.username;

                        Rating.find({username: username, film_title: filmTitle}, function (err, ratings) {
                            if (err) {
                                res.status(401).send('Something went wrong');
                            } else if (!ratings || ratings === '') {
                                res.status(404).send('No ratings found');
                            } else {
                                var i = 0;
                                var ratingMap = [];

                                ratings.forEach(function (rating) {
                                    ratingMap[i] = rating;
                                    i++;
                                });
                                res.status(200).send(ratingMap);
                            }
                        })
                    }
                });
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
            // var dec_token = req.headers['authorization'];
            // decoded;
        }
    });

});


Router.get('/:filmtitle/averageRating', function (req, res) {

    var filmTitle = req.param('filmtitle');

    Film.findOne({titel: filmTitle}, function (err, film) {
        if (!film) {
            res.status(404).send("film not found");
        } else {
            try {
                if (err) {
                } else {

                    Rating.find({film_title: filmTitle}, function (err, ratings) {
                        if (err) {
                            res.status(401).send('Something went wrong');
                        } else if (!ratings) {
                            res.status(404).send('No ratings found');
                        } else {
                            var i = 0;
                            var ratingMap = [];

                            ratings.forEach(function (rating) {
                                ratingMap[i] = rating.sterren;
                                i++;

                            });

                            var j = 0;
                            var averageRating = [];
                            var ratingsAdded = 0;

                            ratingMap.forEach(function () {
                                ratingsAdded = ratingsAdded + ratingMap[j];
                                j++;
                            });
                            averageRating[0] = Math.round(ratingsAdded / j);
                            res.status(200).send(averageRating);
                        }
                    })
                }
            } catch (e) {

            }
        }
    });
});




