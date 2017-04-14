var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/img-upload'});

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/profile/uploads", upload.single('myFile'), uploadImage);
    app.get("/project/api/user/:username", findUserByUsername);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.post("/api/login", passport.authenticate('project'), login);
    app.get("/project/user/:userId", findUserById);
    app.put("/project/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);

    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/project/#/',
        failureRedirect: '/project/#/login'
    }));
    var facebookConfig = {
        clientID: "281192055652658", //process.env.FACEBOOK_CLIENT_ID,
        clientSecret: "e15f9cc33687f647036afde07d30b6d0", //process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:2900/auth/facebook/callback" //process.env.FACEBOOK_CALLBACK_URL
    };


    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
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

    function projectLocalStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type === "member") {
            userModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        } else if (user.type === "developer") {
            userModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        done(err);
                    }
                }
            );
    }


    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already in use");
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (error) {
                            if (error) {
                                res.status(400).send(error);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already in use");
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        userModel
                            .createUser(req.body)
                            .then(
                                function (user) {
                                    res.json(user);
                                },
                                function (error) {
                                    res.statusCode(400).send(error);
                                }
                            );
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            findAllUsers(req, res);
        }
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.statusCode(404).send({});
                }
            )
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send({});
                }
            )
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function uploadImage(req, res) {

        var userId = req.body.userId;
        var myFile = req.file;

        if (myFile) {
            var originalname = myFile.originalname;
            var filename = myFile.filename;
            var path = myFile.path;
            var destination = myFile.destination;
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var user = {
                url: "/img-upload/" + filename
            };
            userModel
                .updateUser(userId, user)
                .then(
                    function (success) {
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.statusCode(404).send(error);
                    }
                );
            res.redirect("/project/#/user/profile");
        } else {
            res.redirect("/project/#/user/profile");
        }
    }
};