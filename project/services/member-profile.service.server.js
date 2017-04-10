module.exports = function (app, models) {

    var followModel = models.followModel;
    app.post("/project/follow/user", createUser);
    app.get("/project/follow/user/:username", findUserByUsername);
    app.put("/project/follow/user/:userId", updateUser);
    app.get("/project/follow/users", findAllUsers);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createUser(req, res) {
        var newUser = req.body;
        followModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        followModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.send(error);
                }
            )
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        followModel
            .updateUser(userId, newUser)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findAllUsers(req, res) {
        followModel.findAllUsers()
            .then(
                function (users) {
                    res.send(users);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
};