var express = require('express');
var router = express.Router();

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

//this position needs to be the geolocation position

router.get('/', function(req, res, next) {
    googleMapsClient.placesNearby({
        location: pos,
        radius: 500,
        type: 'restaurant'
    }, function(err, response) {
        if (!err) {
            console.log(response.json.results[0].geometry.location);
            res.render('map', {
                title: 'map',
                restaurants: response.json.results,

            });
        }
    });
});

router.get('/:id', function(req, res, next) {
    googleMapsClient.place({
        placeid: req.params.id,
    }, function(err, response) {
        if (!err) {
            //console.log(response.json.result);
            res.render('restaurant', {
                place: response.json.result,
            });
        }
    });
});

module.exports = router;