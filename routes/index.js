var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');
const Review = require('../models/reviews');
var googleMapsClient = require('@google/maps').createClient({
    key: process.env.MAP_KEY
});

//this position needs to be the geolocation position
let pos;

// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

module.exports = router;
