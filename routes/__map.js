var express = require('express');
var router = express.Router();
const Review = require('../models/reviews');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

//this position needs to be the geolocation position
let pos = {
    lat: 39.5696,
    lng: 2.6502,
};

router.get('/', function(req, res, next) {

    //const pos = req.session.location;

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
        if(err) throw err;

        let restaurant = response.json.result;
        res.render('restaurant', {
            title: restaurant.name,
            place: restaurant,
            photos: restaurant.photos,
            key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
        });
    });
});

router.post('/:id', function(req, res, next) {

    Review.create(req.body, function (err) {
        if (err) {
            err.status = 400;
            return next(err);
        }else{
            console.log(req.body);
        }
        res.redirect('/map/'+ req.body.restaurantID)

    });
});

router.get('/photo/:photoreference', function(req, res, next) {

    googleMapsClient.placePhoto({
        photoreference: req.params.photoreference,
    }, function(err, response) {
        if(err) throw err;
        let photo = response.json.photo;
        res.send(photo);
    });
});


router.post('/location', function(req, res, next) {

    const location = {
        lat: req.body.lat,
        lng: req.body.lng
    };

    // save location in user session
    req.session.location = location;

    res.send(201);
});

module.exports = router;
