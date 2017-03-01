(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

    function EditPageController($routeParams, PageService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.pages = pages();

        function init(){
            PageService.findPageById(vm.pageId)
                .then(function(response){
                    vm.page = response.data;
                });
        }
        init();

        function pages(){
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function(response){
                    vm.pages = response.data;
                });
        }

        function updatePage(page){
            PageService.updatePage(vm.pageId, page)
                .then(
                    function(success)
                    {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(error){
                        vm.error = "Not able to update the page for website";
                    });
        }

        function deletePage(){
            PageService.deletePage(vm.pageId)
                .then(
                    function(success){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(error){
                        vm.error = "Not able to delete the page for website";
                    }
                );
        }
    }
})();
