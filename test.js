let pos = {
    lat: 39.5696,
    lng: 2.6502,
};

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

googleMapsClient.placesNearby({
    location: pos,
    radius: 500,
    type: 'restaurant'
}, function(err, response) {
    if (!err) {
        console.log(response.json.results);
    }
});

router.get('/', function(req, res, next) {
    let pos = {
        lat: 39.5696,
        lng: 2.6502,
    };

    var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
    });

    googleMapsClient.placesNearby({
        location: pos,
        radius: 500,
        type: 'restaurant'
    }, function(err, response) {
        if (!err) {
            console.log(response.json.results);
            res.render('index', {
                title: 'title if needed',
                restaurants: response.json.results,

            });
        }
    });
});

https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html
