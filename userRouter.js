var express = require('express');
var mongoose = require('mongoose');
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

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        var i = 0;

        var userMap = {};

        users.forEach(function(user) {
            userMap[i] = user;
            i++;
        });

        res.send(userMap);
    });
    // res.json("users");

});

module.exports = router;
