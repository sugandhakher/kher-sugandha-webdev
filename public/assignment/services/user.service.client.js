(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);



    function UserService($http){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api={
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };

        return api;

        function createUser(user){
            users.push(user);
            return user;

        }
        function findUserById(userId){
            return $http.get("api/user/"+userId);
            // for(var i in users){
            //     if(users[i]._id === userId){
            //         return users[i];
            //     }
            // }
            // return null;
        }

        function findUserByUsername(username){
            for(var i in users){
                if(users[i].username === username){
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username,password){
            return $http.get("/api/user?username"+username+"&password"+password);
            // for(var i in users){
            //     if(users[i].username === username && users[i].password === password){
            //         return users[i];
            //     }
            // }
            // return null;
        }

        function updateUser(userId, newUser){
            for(var i in users){
                if(users[i]._id === userId){
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId){
            for(var i in users){
                if(users[i]._id === userId){
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }

    }

})();
