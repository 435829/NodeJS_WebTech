var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var myModule = require('./userRouter');
var User = myModule.User;
var userRouter = myModule.router;

var jwt = require('jsonwebtoken');


var filmModule = require('./filmRouter')
var Film = filmModule.Film;
var filmRouter = filmModule.router;
var Schema = mongoose.Schema;

var rating = new Schema({
    sterren: Number,
    username: String,
    film_title: String
});

var Rating = mongoose.model('Rating', rating);


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
        } else if(!ratings) {
                res.status(404).send('No ratings found');
        }else{
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
            newRating.save()
            res.status(200).send('Rating added');
        }
    })


});
module.exports = router;
