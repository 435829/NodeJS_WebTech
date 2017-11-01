var express = require('express');
var mongoose = require('mongoose');
var Router = express.Router();
var Schema = mongoose.Schema;
var userModule = require('./userRouter');
var User = userModule.User;
var userRouter = userModule.Router;

var jwt = require('jsonwebtoken');


var filmModule = require('./filmRouter');
var Film = filmModule.Film;


var rating = new Schema({
    // _id: Number,
    sterren: Number,
    username: String,
    film_title: String
});

var id = new Schema({
    $oid: String
});

var Rating = mongoose.model('Rating', rating);
var ID = mongoose.model('ID', id);

/**
 * Een get methode om alle ratings te laten zien van de ingelogde persoon aan de hand van de token
 */
Router.get('/', function (req, res) {
    console.log("Show all users ratings");
    var dec_token = req.headers['authorization'],
        decoded;

    try {
        decoded = jwt.verify(dec_token, 'super-secret-key');
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var username = decoded.username;

    Rating.find({username: username}, function (err, ratings) {
        if (err) {
            res.status(401).send('Not authorized, you need to login first');
        } else if (ratings.length === 0) {
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
});

Router.put('/:ratingID/edit', function (req, res) {
    var ratingID = req.param('ratingID');
    if (!req.body.rating) {
        res.status(400).send('Rating required');
        return;
    }

    if ((req.body.rating % 0.5) !== 0) {
        res.status(400).send('Invalid rating');
        return;
    }


    Rating.findOne({_id: ratingID}, function (err, rating) {
        if (!rating) {
            res.status(404).send('Rating not found');

        }
    });

    Rating.update({_id: ratingID}, {$set: {sterren: req.body.rating}}, function (err, rating) {
        if (err) {
            res.status(304).send('Something went wrong');
        } else {
            res.status(200).send('Rating changed');
        }
    });
});

Router.delete('/:ratingID/delete', function (req, res) {
    var ratingID = req.param('ratingID');

    Rating.findOne({_id: ratingID}, function (err, rating) {
        if (!rating) {
            res.status(404).send('Rating not found');
        }
    });

    Rating.remove({_id: ratingID}, function (err) {
        if (err) {
            res.status(304).send('Something went wrong');
        } else {
            res.status(200).send('Rating deleted');
        }
    });
});

/**
 * Een post om films te kunnen raten.
 * De username word automatisch toegevoegd aan de hand van de token van de ingelogde persoon
 */
Router.post('/rate/', function (req, res) {
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

module.exports.Rating = Rating;
module.exports.Router = Router;
