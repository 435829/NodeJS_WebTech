var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json("users");
    console.log("Show all users")
});

module.exports = router;
