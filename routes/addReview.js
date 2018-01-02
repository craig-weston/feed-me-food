var express = require('express');
var router = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCVXZ0vhPliqPIvwSUaSvZJ9XmcoJKtXaM'
});

router.get('/:ID', function(req, res, next) {
    googleMapsClient.place({
        placeid: req.params.ID,
    }, function(err, response) {
        if (!err) {
            console.log(response.json.result.name);
            res.render('addReview', {
                    title: `Review ${response.json.result.name}`,
                    restaurantID: req.params.ID,
                    restaurant: response.json.result
                });

        }
    });

});
module.exports = router;