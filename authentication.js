/**
 * Created by bolin on 11-10-2017.
 */
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var app = express();
var userRouter = require('./userRouter.js');
var User = require('./userRouter');

router.get('/authenticate/:username/:password', function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    User.findOne()({
        name: username
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
             var checkPassword = user.password === password;
            if (!checkPassword) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
    // res.json('Something went wrong')
});


module.exports = router;