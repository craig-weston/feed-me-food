var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const mongoose = require('mongoose');
var index = require('./routes/index');
var restaurant = require('./routes/restaurant');
var addReview = require('./routes/addReview');
var users = require('./routes/users');
var map = require('./routes/map');
var geolocate = require('./routes/geolocate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
require('./models/reviews');


//const seeder = require('mongoose-seeder'),
    //data = require('./public/data/restaurants.json');

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const db = mongoose.connect('mongodb://localhost:27017/restaurantReviews', {
    useMongoClient: true
});

db.on('error', function(err){
    console.error('connection error:', err)
});

db.once('open', function() {
    console.log('db connected');
    //get seeded data


    /*seeder.seed(data, {}, () => {
        console.log('data seeded')
    }).then(function(dbData) {
        // The database objects are stored in dbData
    }).catch(function(err) {
        console.log(err);
    });*/
});


//app.use('/', index);
//app.use('/restaurant', restaurant);
app.use('/addReview', addReview);
//app.use('/users', users);
app.use('/map', map);
//app.use('/geolocate', geolocate);
//app.use('/ajax/places', function(req, res){
    //const places = // call gmaps api
    //res.json([]);
//} );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
