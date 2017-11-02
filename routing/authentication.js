/**
 * Created by bolin on 11-10-2017.
 */
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
// var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var myModule = require('./userRouter');
var User = myModule.User;
var userRouter = myModule.Router;
var router = express.Router();

// app.use(bodyParser.json);


// https://jwt.io/introduction/
router.post('/authenticate/', function (req, res) {
    //Controleer of er een username ingevuld is
    if (!req.body.username) {
        res.status(400).send('Username required');
        return;
    }
//Controleer of er een wachtwoord is ingevuld
    if (!req.body.password) {
        res.status(400).send('Password required');
        return;
    }

//Vind de user die in wil logen door middel van de username
    User.findOne({username: req.body.username}, function (err, user) {
        if (!user) {
            res.status(404).send('User not found');
        } else
        //Controleer het wachtwoord
        if (user.checkPassword(user, req.body.password)) {
            //Maak een token aan met de username van de gebruiker
            var myToken = jwt.sign({username: req.body.username}, 'super-secret-key');
            res.status(200).json(myToken);
        } else {
            res.status(400).send('Incorrect password');
        }
    });
});

module.exports = router;