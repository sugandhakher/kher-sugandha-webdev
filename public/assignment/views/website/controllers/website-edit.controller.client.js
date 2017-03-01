/**
 * Created by sony on 15-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController);

    function EditWebsiteController($routeParams,WebsiteService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.websites = websites();

        function init(){
            WebsiteService.findWebsiteById(vm.websiteId)
                .then(function(response){
                    vm.website = response.data;
                });
        }
        init();


        function websites(){
            WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function(result){
                    vm.websites=result;
                })
                .error(function(error){
                    console.log("server error");
                })
        }

        function updateWebsite(website){
            WebsiteService.updateWebsite(vm.websiteId, website)
                .then(
                    function(success){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(error){
                        vm.error = "Not able to update the website for the user";
                    });
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(
                    function(success){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(error){
                        vm.error = "Not able to update the website for the user";
                    });
        }
    }
})();
