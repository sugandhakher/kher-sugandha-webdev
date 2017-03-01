(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);

    function EditWidgetController($routeParams, WidgetService,$location){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            WidgetService.findWidgetById(vm.widgetId)
                .then(function(response){
                    vm.widget = response.data;
                });
        }
        init();

        function updateWidget(widget){
            WidgetService.updateWidget(vm.widgetId,widget)
                .then(
                    function(success){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function (error) {
                        vm.error = "Not able to update the widget";
                    });
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId)
                .then(
                    function(success){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function(error){
                        vm.error = "Not able to delete the widget";
                    }
                );
        }
    }
})();
