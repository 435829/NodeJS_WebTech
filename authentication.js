/**
 * Created by bolin on 11-10-2017.
 */
var express = require('express');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded);
var userRouter = require('./userRouter.js');
var User = require('./userRouter');

// router.get('/authenticate/:username/:password', function (req, res) {
//     var username = req.param('username');
//     var password = req.param('password');
//     // User.findOne({
//     //     name: req.body.name
//     // }, function (err, user) {
//     //
//     //     if (err) throw err;
//
//     if (!user) {
//         res.json({success: false, message: 'Authentication failed. User not found.'});
//     } else if (user) {
//
//         // check if password matches
//         //TODO checkpassword werkt nog niet
//         var checkPassword = user.checkPassword(username, password);
//         // var checkPassword = user.password === password;
//         if (!checkPassword) {
//             res.json({success: false, message: 'Authentication failed. Wrong password.'});
//         } else {
//
//             // if user is found and password is right
//             // create a token with only our given payload
//             var token = jwt.sign(user, app.get('superSecret'), {
//                 expiresInMinutes: 1440 // expires in 24 hours
//             });
//
//             // return the information including token as JSON
//             res.json({
//                 success: true,
//                 message: 'Enjoy your token!',
//                 token: token
//             });
//         }
//
//     }
// });
//
// //     });
// //     // res.json('Something went wrong')
// // });

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
            res.status(200).json({});
        }
    });
});
});



module.exports = router;