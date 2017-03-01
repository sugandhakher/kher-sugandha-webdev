(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    function NewPageController($routeParams, PageService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;
        vm.pages = pages();


        function pages(){
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function(response){
                    vm.pages = response.data;
                });
        }

        function createPage(pageName){
            var newPage = {
                name: pageName
            };
            PageService.createPage(vm.websiteId, newPage)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(error){
                        vm.error = "Not able to create a page for the user";
                    }
                );
        }
    }
})();
