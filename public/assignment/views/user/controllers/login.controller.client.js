(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location, UserService){
        var vm = this;
        vm.login = function(username,password){

                UserService
                    .login(username,password)
                    .then(
                        function (response){
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);

                        },
                        function(error){
                            vm.error = "User not found";
                        });

        }
    }
})();
