(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService(){
        var users = [

            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            var new_user={};
            new_user.username = user.username;
            new_user.email = user.email;
            new_user.firstName = user.firstname;
            new_user.lastName = user.lastname;
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function findUserById(uid){
            for(var u in users){
                var user = users[u];
                if (user._id === uid ){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for (var u in users){
                var user = users[u];
                if(user.username === username &&
                    user.password === password){
                    return angular.copy(user);
                }
            }
            return null;
        }
    }
})();

