/**
 * Created by sony on 21-02-2017.
 */
module.exports = function(app){
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "billy",   password: "billy",   firstName: "Billy", lastName: "Joe"  },
        {_id: "456", username: "sugandha", password: "sugandha", firstName: "Sugandha",   lastName: "Kher" }
    ];

    function updateUser(req, res){
        var userId = req.params.userId;
        var newUser = req.body;
        for(var i in users){
            if(users[i]._id === userId){
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.json(users[i]);
                return;
            }
        }
    }


    function findUserById(req, res){
        var userId = req.params.userId;
        var user = users.find(function (u){
            return u._id == userId;
        });
        res.json(user);

    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var queryParams = req.query;
        console.log(queryParams);

        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        console.log(user);
        res.json(user);

    }
}


