/**
 * Created by sony on 15-02-2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;

        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
})();

