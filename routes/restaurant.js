var express = require('express');
var router = express.Router();

router.get('/:ID', function(req, res, next) {
    res.render('restaurant', {
        title: 'title if needed',
        restaurant: 'ChIJAxbcKmaSlxIRXlys2hUXidQ',
        place: res.body
    });
    console.log(res.body)

});
module.exports = router;