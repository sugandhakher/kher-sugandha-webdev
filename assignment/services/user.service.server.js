/**
 * Created by sony on 01-03-2017.
 */

module.exports = function(app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Jannunzi" }
    ];


    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.send(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var queryParams = req.query;
        var user = users.find(function (user) {
            return user.password == password && user.username == username;
        });
        console.log(user);
        res.send(user);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.send(user);

    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === userId) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(users[i]);
                return;
            }
        }
        res.send(200);
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
};