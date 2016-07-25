var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

var port = 9000;
var db = 'mongodb://localhost/search_app';
var users = require('./routes/user');
var websites = require('./routes/website');

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cats',
  saveUnitialized: true,
  resave: true
}));

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

//keep routes at bottom
app.use('/users', users);
app.use('/websites', websites);

app.listen(port, function() {
  console.log('Search App Server listening on port ' + port);
});
