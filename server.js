var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({
    secret: "Secret",
    // name: cookie_name,
    // store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// require ("./test/app.js")(app);
// require ("./blog/app")(app);
//
// require("./lectures/mongo/movies")(app);

var port = process.env.PORT || 2900;
// var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
// var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require ("./assignment/app.js")(app);

var project = require("./project/app.js");
project(app);


app.listen(port);