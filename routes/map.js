var express = require('express');
var router = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

//this position needs to be the geolocation position
let pos = {
    lat: 39.5696,
    lng: 2.6502,
};

router.get('/', function(req, res, next) {

    googleMapsClient.placesNearby({
        location: pos,
        radius: 500,
        type: 'restaurant'
    }, function(err, response) {
        if (!err) {
            //console.log(response.json.results[0].geometry.location);
            res.render('map', {
                title: 'Restaurants Nearby',
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
                title: response.json.result.name,
                place: response.json.result,
            });
        }
    });
});

module.exports = router;