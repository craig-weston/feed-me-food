var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const errorHandlers = require('./handlers/errorHandlers');
var app = express();
var routes = require('./routes/index');
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
//require('./models/reviews');


//const seeder = require('mongoose-seeder'),
    //data = require('./public/data/restaurants.json');

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const db = mongoose.connect('mongodb://localhost:27017/restaurantReviews', {
    useMongoClient: true
});

db.on('error', function(err){
    console.error('connection error:', err)
});

// use sessions for tracking logins
app.use(session({
    secret: 'foodhits is the best',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());
// make user ID available in templates
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    res.locals.flashes = req.flash();
    next();
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




app.use('/', routes);
//var index = require('./routes/index');
//var addReview = require('./routes/addReview');
//var register = require('./routes/register');
//var map = require('./routes/__map');
//app.use('/', index);
//app.use('/', register);
//app.use('/addReview', addReview);
///app.use('/map', map);


// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

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
