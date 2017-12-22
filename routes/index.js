var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Review = require('../models/reviews');

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});
let restaurantstest = [];
let pos = {
    lat: 39.5696,
    lng: 2.6502,
};

/* GET home page. */
router.get('/index', function(req, res, next) {
    googleMapsClient.placesNearby({
        location: pos,
        radius: 500,
        type: 'restaurant'
    }, function(err, response) {
        if (!err) {



            markers = ``
            response.json.results.forEach(place => {
                console.log(typeof place.name)

                markers += `var marker = new google.maps.Marker({
                        position: {lat: ${place.geometry.location.lat}, lng: ${place.geometry.location.lng}},
                        map: map,
                        title: \`${place.name}\`
                    });`;
                //console.log(markers)
                windows = `var infowindow = new google.maps.InfoWindow({
                    content: \`${place.name}\`
                });`

            });


            restaurantstest.push(response.json.results);
            console.log(markers)
            res.render('index', {
                title: 'index',
                restaurants: response.json.results,
                markers: markers,
                map: `map.initMap = function(){
                        let pos = {
                            lat: 39.569016,
                            lng: 2.6455
                        };
                        var myLatLng = pos;
                        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 14,
                            center: myLatLng
                        });
                        ${markers}
                       ${windows}
                      }`,
            });
        }
    });
});

//to be fixed so to add to database
router.post('/review', (req, res, next) => {
    Review.create(req.body, function (err) {
        if (err) {
            err.status = 400;
            return next(err);
        }else{
            console.log(req.body);
        }
        /*res.render("index", {
            name: req.body.name,
        });*/
        //res.location('/');
        res.status(200);  //returns no content
    });
});

module.exports = router;
