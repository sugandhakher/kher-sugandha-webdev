(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location, UserService){
        var vm = this;
        vm.login = login;

        function login(user){

            var promise = UserService
                .findUserByCredentials(user.username,user.password);
            promise
                .success(function(user){
                if(user!=null){
                    $location.url("/user/"+user._id);
                }else{
                    vm.error = "Please check username and password"
                }
            })
                .error(function(err) {
                    vm.error = 'user not found';
                });
        }
    }
})();