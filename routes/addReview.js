var express = require('express');
var router = express.Router();

router.get('/:ID', function(req, res, next) {
    res.render('addReview', { title: 'title if needed', restaurant: req.params.ID});

});
module.exports = router;