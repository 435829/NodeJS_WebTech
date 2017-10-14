var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var router = express.Router();
var user = new Schema({
    achternaam: String,
    tussenvoegsels: String,
    voornaam: String,
    username: String,
    wachtwoord: String
});

var User = mongoose.model('User', user);

User.prototype.checkPassword = function (user, password) {
    return user.wachtwoord === password;
};

router.post('/register', function (req, res) {

    var exists = false;
    var usersList = [];

    if (!req.body.username) {
        res.status(400).send('Username required');
        return;
    }
//Controleer of er een wachtwoord is ingevuld
    if (!req.body.password) {
        res.status(400).send('Password required');
        return;
    }
    if (!req.body.achternaam) {
        res.status(400).send('Last name required');
        return;
    }
    if (!req.body.voornaam) {
        res.status(400).send('First name required');
        return;
    }

    User.findOne({username: req.body.username}, function (err, user) {
        if (!user){
            new User({
                achternaam: req.body.achternaam,
                tussenvoegsels: req.body.tussenvoegsel,
                voornaam: req.body.voornaam,
                username: req.body.username,
                wachtwoord: req.body.password
            }).save();

            res.status(201); //Created
        } else {
            res.status(409).send('Username is already in use');
        }
    });
});

router.get('/:usernameR', function (req, res) {
    // verify a token symmetric
    var token = req.headers['authorization'];
    jwt.verify(token, 'super-secret-key', function(err, decoded) {
        if (err) {
            res.status(401).send('Not authorized, you need to login first');
        } else {

            var usernameRequest = req.param('usernameR');

            User.find({username: usernameRequest}, function (err, users) {
                var i = 0;
                var userMap = {};

                users.forEach(function(user) {
                    userMap[i] = user;
                    i++;
                });

                res.status(200);
                res.send(userMap);
            });
            }
    });
    // res.json("users");

});

router.get('/', function (req, res) {
    var token = req.headers['authorization'];
    jwt.verify(token, 'super-secret-key', function(err, decoded) {
        if (err) {
            res.status(401).send('Not authorized, you need to login first');
        } else {
            User.find({}, function (err, users) {
                var i = 0;

                var userMap = {};

                users.forEach(function (user) {
                    userMap[i] = user;
                    i++;
                });

                res.status(200);
                res.send(userMap);
            });
            // res.json("users");
        }
    });
});


module.exports.router = router;
module.exports.User = User;