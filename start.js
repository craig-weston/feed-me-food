// import environmental variables from our variables.env file
//require('dotenv').config({ path: 'variables.env' });
// Start our app!
var port = process.env.PORT || 8080;
const app = require('./app');
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});