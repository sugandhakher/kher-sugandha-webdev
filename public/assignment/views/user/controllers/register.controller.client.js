(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController",registerController);

    function registerController($location,UserService){
        var vm = this;

        vm.addnew = addnew;

        function addnew(user) {
            if (user) {
                var existuser = UserService.findUserByUsername(user.username);
                if(!existuser) {
                    if (user.password == user.vpassword) {
                        nuser = UserService.createUser(user);
                        $location.url("/user/" + nuser._id);
                    }
                    else {
                        vm.error = "Passwords do not match."
                    }
                }
                else{
                    vm.error = "Username already exists."
                }
            }
            else{
                vm.error = "Error occured."
            }
        }
    }
})();