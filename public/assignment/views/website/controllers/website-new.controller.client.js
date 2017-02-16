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

        function createWebsite(websiteName){
            var newWebsite = {
                _id: new Date().getTime() + "",
                name: websiteName
            };
            var result = WebsiteService.createWebsite(vm.userId, newWebsite);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error = "Not able to create a website for the user";
            }

        }
    }
})();
