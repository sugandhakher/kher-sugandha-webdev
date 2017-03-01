/**
 * Created by sony on 15-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;
        vm.websites = websites();

        function websites(){
            WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(result){
                    vm.websites=result;
                })
                .error(function(error){
                    console.log("server error");
                })
        }

        function createWebsite(websiteName){
            var newWebsite = {
                name: websiteName
            };
            WebsiteService.createWebsite(vm.userId, newWebsite)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(error){
                        vm.error = "Not able to create a website for the user";
                    });
        }
    }
})();