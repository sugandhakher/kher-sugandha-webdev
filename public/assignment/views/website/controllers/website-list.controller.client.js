(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);


    function WebsiteListController($routeparams){

        var vm = this;

        var userId = $routeParams.uid;
        vm.websites = WebService.findWebsitesForUser(userId);

        var websites = [
            {"_id": "123", "name": "Facebook", "description": "Most popular"},
            {"_id": "234", "name": "Wikipedia", "description": "Worlds encyclopedia"}
        ];

   }
})();