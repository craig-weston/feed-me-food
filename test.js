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


map.pug
each restaurant in restaurantSchema

		meta(name='info' value={restaurants})

		$('.iw-reviews').forEach(element => {
		    const coordinates = element.data('coordinates')
			element.data('description')

			map.marker(coordinates).addTo(map)
				.bindPopup('<h1>' + element.data('title') + '</h1>')
				.openPopup()
		});


(function() {

    $.get('/ajax/places')
        .success( places => {
            // ... call goolge maps
    })

})();


each restaurant in restaurants
						div(data-coordinates)
							a.iw-reviews(data-long={restaurant.longitude} href=`/map/${restaurant.place_id}`) #{restaurant.name}
					#loading.loading





app.use('/', index);
app.use('/ajax/places', function(req, res){
    //const places = // call gmaps api
    res.json([]);
} );
