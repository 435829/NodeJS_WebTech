/**
 * Created by bolin on 11-10-2017.
 */
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userRouter = require('./userRouter.js');
var User = require('./userRouter');
var router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json);


// https://jwt.io/introduction/
router.post('/authenticate/', function (req, res) {
    //Controleer of er een username ingevuld is
if (!req.body.username){
    res.status(400).send('Username required');
    return;
}
//Controleer of er een wachtwoord is ingevuld
if (!req.body.password){
    res.status(400).send('Password required');
    return;
}

//Vind de user die in wil logen door middel van de username
User.findOne({username: req.body.username}, function (err, user) {
    //Controleer het wachtwoord
    user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) throw err;
        //Als het wachtwoord niet overeen komt, gooi 401
        if (!isMatch) {
            res.status(401).send('Incorrect password');
        } else {
            //Als het wachtwoord klopt, gooi een 200
            var myToken = jwt.sign({username: req.body.username}, 'super-secret-key');
            res.status(200).json(myToken);
        }
    });
});
});



module.exports = router;