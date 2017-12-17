var express = require('express');
var router = express.Router();

router.get('/:ID', function(req, res, next) {
    res.render('restaurant', {
        title: 'title if needed',
        restaurant: 'ChIJAxbcKmaSlxIRXlys2hUXidQ',
        //place: req.body
        /*place: {
            name: "my restaurant",
            vicinity: "lalal land"
        },*/
        //name: req.body.place.name,
        //place: req.body.place
        place: 'my restaurant',
        name: 'name',
        vicinity: 'lalal land',
        phone: 78787,
        website: 'llala.com',
        reviews: {
            description: 'lala'
        }
    });
    console.log(req.body)

});
module.exports = router;