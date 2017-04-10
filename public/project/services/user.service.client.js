(function () {
    angular
        .module("BookMyEvent")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            login: login,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout: logout,
            loggedIn: loggedIn,
            register: register,
            getUsers: getUsers
        };

        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function loggedIn() {
            return $http.get("/api/loggedIn")
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function createUser(user) {
            return $http.post("/api/user", user);

        }

        function findUserById(userId) {
            return $http.get("/project/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/project/api/user/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/project/user/" + userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function getUsers() {
            return $http.get("/api/user");
        }

    }

})();
