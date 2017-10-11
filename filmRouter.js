var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json("films");
    console.log("Show all films")
});

module.exports = router;
