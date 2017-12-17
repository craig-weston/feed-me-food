var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Review = require('../models/reviews');
let restaurant = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'title if needed',
      restaurant: 'ChIJAxbcKmaSlxIRXlys2hUXidQ',
      place: req.body
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
