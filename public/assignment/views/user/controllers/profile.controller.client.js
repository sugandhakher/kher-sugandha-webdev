
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams,UserService,$location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        vm.id = $routeParams.userId;

        function init(){
            UserService
                .findUserById(vm.id)
                .then(
                    function(response){
                        vm.user = response.data;
                    });
        }

        init();

        function updateUser(newUser){
            UserService
                .updateUser(vm.id,newUser)
                .then(
                    function(response){
                        vm.success = "Updated succesfully";
                    },
                    function(error){
                        vm.error = "Not able to update the user";
                    }
                );
        }

        function deleteUser(){
            UserService
                .deleteUser()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to delete the user";
                    }
                );
        }
    }
})();
