var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var myModule = require('./userRouter');
var User = myModule.User;
var userRouter = myModule.router;

var jwt = require('jsonwebtoken');


var filmModule = require('./filmRouter');
var Film = filmModule.Film;
var Schema = mongoose.Schema;

var rating = new Schema({
    // _id: Number,
    sterren: Number,
    username: String,
    film_title: String
});

var id = new Schema({
    $oid: String
})

var Rating = mongoose.model('Rating', rating);
var ID = mongoose.model('ID', id);

/**
 * Een get methode om alle ratings te laten zien van de ingelogde persoon aan de hand van de token
 */
router.get('/', function (req, res) {
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
            var ratingMap = {};

            ratings.forEach(function (rating) {
                ratingMap[i] = rating;
                i++;
            });
            res.status(200).send(ratingMap);
        }
    })
});

router.put('/:ratingID/edit', function (req, res) {
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

router.delete('/:ratingID/delete', function (req, res) {
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

module.exports.Rating = Rating;
module.exports.router = router;
