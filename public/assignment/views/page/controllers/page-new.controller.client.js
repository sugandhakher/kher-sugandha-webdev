(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    function NewPageController($routeParams, PageService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(pageName){
            var newPage = {
                _id: new Date().getTime() + "",
                name: pageName
            };
            var result = PageService.createPage(vm.websiteId, newPage);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }else{
                vm.error = "Not able to create a page for the user";
            }

        }
    }
})();