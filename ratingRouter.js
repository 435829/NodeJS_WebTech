var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json("ratings");
    console.log("Show all ratings")
});

module.exports = router;
