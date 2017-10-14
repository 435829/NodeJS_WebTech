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

                res.send(userMap);
            });
            // res.json("users");
        }
    });
});


module.exports.router = router;
module.exports.User = User;