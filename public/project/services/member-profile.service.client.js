(function () {
    angular
        .module("BookMyEvent")
        .factory("MemberProfileService", MemberProfileService);

    function MemberProfileService($http) {
        var api = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            return $http.post("/project/follow/user", user);

        }

        function findUserById(userId) {
            return $http.get("/project/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/project/follow/user/" + username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/project/follow/user/" + userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/project/follow/users");
        }

    }

})();
