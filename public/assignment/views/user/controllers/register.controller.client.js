(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams,UserService,$location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username,password1,password2) {
            if(username && password1 === password2){
                var newUser = {
                    username: username,
                    password: password1,
                    firstName: "",
                    lastName: ""
                };

                UserService
                    .createUser(newUser)
                    .then(
                        function(response){
                            var user = response.data;
                            $location.url("/user/"+user._id);
                        },
                        function(error){
                            vm.error = "User not created";
                        }
                    );
            }else{
                if(username === undefined ) {
                    vm.error = "Please enter a username";
                }else if(password1 === undefined || password2 === undefined){
                    vm.error = "Please enter password";
                }else{
                    vm.error = "Passwords do not match. Please check!!";
                }

            }
        }
    }
})();
