"use strict";
(function () {
    angular
        .module("BookMyEvent")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $rootScope) {
        var vm = this;
        vm.user = $rootScope.currentUser;
        vm.select = select;
        vm.add = add;
        vm.update = update;
        vm.remove = remove;

        function init() {
            vm.inputUser = {};
            vm.selected = -1;
            UserService
                .getUsers()
                // .login({username: "admin", password : "admin"})
                .then(
                    function (response) {
                        console.log("I am here");
                        vm.users = response.data;
                        console.log(response.data);
                        vm.inputUser = {};
                        vm.selected = -1;
                    },
                    function (error) {
                        console.log("Errror");
                        vm.error = error;
                    });
        }

        init();

        vm.predicate = 'username';
        vm.reverse = true;
        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };

        function select(user) {
            vm.inputUser = angular.copy(user);
            vm.selected = 0;
        }

        function remove(user) {
            UserService
                .deleteUser(user._id)
                .then(callSuccess, callError);
        }

        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(callSuccess, callError);
        }

        function add(user) {
            UserService
                .createUser(user)
                .then(callSuccess, callError);
        }

        function callSuccess(response) {
            vm.users = response.data;
            vm.inputUser = {};
            vm.selected = -1;
            init();
        }

        function callError(error) {
            vm.error = error.data;
        }

    }
})();