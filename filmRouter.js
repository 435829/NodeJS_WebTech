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

        var filmMap = [];

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

            try {
                jwt.verify(dec_token, 'super-secret-key', function (err, decoded) {
                    if (err) {
                        return res.status(401).send('unauthorized');
                    } else {
                        var username = decoded.username;

                        Rating.find({username: username, film_title: filmTitle}, function (err, ratings) {
                            if (err) {
                                res.status(401).send('Something went wrong');
                            } else if (!ratings) {
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

/**
 * Een post om films te kunnen raten.
 * De username word automatisch toegevoegd aan de hand van de token van de ingelogde persoon
 */
router.post('/rate/', function (req, res) {
    //Controleer of er een filmtitel ingevuld is
    if (!req.body.filmTitle) {
        res.status(400).send('Film title required');
        return;
    }
//Controleer of er een rating is ingevuld
    if (!req.body.rating) {
        res.status(400).send('Rating required');
        return;
    }

    if ((req.body.rating % 0.5) !== 0) {
        res.status(400).send('Invalid rating');
        return;
    }

    Film.findOne({titel: req.body.filmTitle}, function (err, film) {
        if (!film) {
            res.status(404).send('Film not found');
        } else {
            var dec_token = req.headers['authorization'],
                decoded;

            try {
                decoded = jwt.verify(dec_token, 'super-secret-key');
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
            // var username = decoded.username;

            var newRating = new Rating({
                sterren: req.body.rating,
                username: decoded.username,
                film_title: req.body.filmTitle
            });
            newRating.save();
            res.status(200).send('Rating added');
        }
    })


});

router.get('/:filmtitle/averageRating', function (req, res) {

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
                                var j = 0;
                                var ratingMap = [];
                                var averageRating = [];
                                var ratingsAdded = 0;

                                ratings.forEach(function (rating) {
                                    ratingMap[i] = rating.sterren;
                                    i++;

                                });
                                ratingMap.forEach(function () {
                                    ratingsAdded = ratingsAdded + ratingMap[j];
                                    j++;
                                });
                                averageRating[0] = Math.round(ratingsAdded / j);
                                res.status(200).send(averageRating);
                            }
                        })
                    }
            } catch (e){

            }
        }
    });
});

module.exports.Film = Film;
module.exports.router = router;
