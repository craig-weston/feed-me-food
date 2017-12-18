var express = require('express');
var router = express.Router();


var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

router.get('/', function(req, res, next) {

    const geolocation = require ('google-geolocation') ({
        key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
    });

// Configure API parameters
    const params = {
        wifiAccessPoints: [
            {
                macAddress: '01:23:45:67:89:AB',
                signalStrength: -65,
                signalToNoiseRatio: 40
            }
        ]
    };

// Get data
    geolocation (params, (err, data) => {
        if (err) {
            console.log (err);
            return;
        }

        console.log (data);
    });
    /*googleMapsClient.geolocate({
        considerIp: true
    }, function(err, response) {
        if (!err) {
            console.log(response.json.location);
            res.render('map', {
                title: 'map',
                restaurants: response.json.location,

            });
        }
    });*/
});

module.exports = router;