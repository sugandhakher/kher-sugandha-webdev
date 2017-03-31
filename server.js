var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
//app.use(session({ secret: process.env.SESSION_SECRET }));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
// require ("./blog/app")(app);
//
// require("./lectures/mongo/movies")(app);

var port = process.env.PORT || 3000;


require ("./assignment/app.js")(app);

app.listen(port);