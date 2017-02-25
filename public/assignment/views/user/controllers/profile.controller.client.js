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
            var promise = UserService.findUserById(vm.id);
            promise.success(function(user){
                vm.user = user;
            });

        }
        init();

        function updateUser(newUser){
            var user = UserService.updateUser(vm.id,newUser);
            if (user!=null){
                vm.message="User Successfully updated"
            }
            else{
                vm.error = "Unable to update"
            }
        }

        function deleteUser(){
            var result = UserService.deleteUser(vm.id);
            if(result){
                $location.url("/login");
            }else{
                vm.error = "User cannot be deleted";
            }
        }

    }
})();
