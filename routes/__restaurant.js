var express = require('express');
var router = express.Router();

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

router.get('/:id', function(req, res, next) {
    googleMapsClient.place({
        query: 'ChIJw0anMkWSlxIRiifgtrYDSeU',
    }, function(err, response) {
        if (!err) {
            console.log(response.json.results);
            res.render('restaurant', {
                title: 'restaurant',
                place: response.json.results,

            });
        }
    });
});
module.exports = router;