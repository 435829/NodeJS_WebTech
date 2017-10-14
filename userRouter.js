var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var router = express.Router();
var app = express();
app.set('private-key', 'super-secret-key');
var user = new Schema({
    achternaam: String,
    tussenvoegsels: String,
    voornaam: String,
    username: String,
    wachtwoord: String,
    get password() {
        return this.wachtwoord;
    }
});

var User = mongoose.model('User', user);


User.prototype.checkPassword = function (user, password) {
    return user.password == password;
};

User.prototype.findOneUser = function (username) {
    User.find({username: username}, function (err, users) {
        var i = 0;
        var userToFind = null;

        users.forEach(function (user) {
            if (user.username === username){
                userToFind = user;
            }
        });
        res.send(userToFind);
    });
};

router.get('/:usernameR', function (req, res) {
    var usernameRequest = req.param('usernameR');

    User.find({username: usernameRequest}, function (err, users) {
        var i = 0;
        var userMap = {};

        users.forEach(function (user) {
            userMap[i] = user;
            i++;
        });

        res.send(userMap);
    });
    // res.json("users");

});

router.get('/', function (req, res) {
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

});
//
// var newUser1 = new User({
//     achternaam: 'Storm',
//     tussenvoegsels: 'van',
//     voornaam: 'Robert',
//     username: 'RobertStorm',
//     wachtwoord: 'test12'
// });
// newUser1.save();
//
// var newUser2 = new User({
//     achternaam: 'Bolink',
//     tussenvoegsels: 'niks',
//     voornaam: 'Robin',
//     username: 'RobinBolink',
//     wachtwoord: 'test12123123'
// });
// newUser2.save();
//
// var newUser3 = new User({
//     achternaam: 'Bruijn',
//     tussenvoegsels: 'de',
//     voornaam: 'Joran',
//     username: 'JorandeBruijn',
//     wachtwoord: 'bruintje'
// });
// newUser3.save();
//
// var newUser4 = new User({
//     achternaam: 'Hollegien',
//     tussenvoegsels: 'niks',
//     voornaam: 'David',
//     username: 'DavidHollegien',
//     wachtwoord: 'david'
// });
// newUser4.save();
//
// var newUser5 = new User({
//     achternaam: 'Vincent',
//     tussenvoegsels: 'van',
//     voornaam: 'Overvelde',
//     username: 'vinnie',
//     wachtwoord: 'aardbei'
// });
// newUser5.save();
//
// var newUser6 = new User({
//     achternaam: 'Scholten',
//     tussenvoegsels: 'van',
//     voornaam: 'Tim',
//     username: 'TimScholten',
//     wachtwoord: 'scholt'
// });
// newUser6.save();
//
// var newUser7 = new User({
//     achternaam: 'aardbei',
//     tussenvoegsels: 'van',
//     voornaam: 'banaan',
//     username: 'banenen',
//     wachtwoord: 'aardbei'
// });
// newUser7.save();
//
// var newUser8 = new User({
//     achternaam: 'Tafel',
//     tussenvoegsels: 'van',
//     voornaam: 'Stoel',
//     username: 'TafelMetStoel',
//     wachtwoord: 'tafelstoel'
// });
// newUser8.save();
//
// var newUser9 = new User({
//     achternaam: 'Bord',
//     tussenvoegsels: 'van',
//     voornaam: 'appel',
//     username: 'appelBord',
//     wachtwoord: 'peer'
// });
// newUser9.save();
//
// var newUser10 = new User({
//     achternaam: 'laptop',
//     tussenvoegsels: 'van',
//     voornaam: 'pc',
//     username: 'pcLaptop',
//     wachtwoord: 'lappie'
// });
// newUser10.save();




module.exports = router;
module.exports = User;
