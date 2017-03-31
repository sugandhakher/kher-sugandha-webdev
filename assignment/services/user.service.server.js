/**
 * Created by sony on 01-03-2017.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        developerModel
            .findUserByFacebookId(profile.id)
            .then(
                function (facebookUser) {
                    if (facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        }
                    }
                    userModel.createUser(facebookUser)
                        .then(
                            function (user) {
                                done(null, user);
                            }
                        );
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }


    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }



    function createUser(req, res){
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){
                    res.json(user);
                }, function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUserById(req, res){
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(
                function(user){
                    res.send(user);
                }, function(error){
                    res.statuscode(404).send(error);
                }
            );
    }


    function findUserByUsername(req, res){
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                }, function(error){
                    res.statusCode(404).send(error);
                }
            )
    }


    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    res.json(user);
                }, function(error){
                    res.statusCode(404).send({});
                }
            )
    }


    function updateUser(req, res){
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(stats){
                    res.sendStatus(200)
                }, function(error){
                    res.statusCode(404).send(error);
                }
            );
    }


    function deleteUser(req, res){
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(stats){
                    res.send(200);
                }, function(error){
                    res.statusCode(404).send(error);
                }
            );
    }


};