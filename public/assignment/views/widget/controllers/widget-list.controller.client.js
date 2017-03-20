(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;

        // $("#widgetList").sortable({
        //     axis:"y"
        // });

        function reorderWidget(index1, index2){
            WidgetService
                .reorderWidget(vm.pageId, index1, index2)
                .then(
                    function(success){
                        init();
                    }, function(error){
                        vm.error = "Not able to reorder"
                    }
                )
        }

        function init(){
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function(response){
                    vm.widgets = response.data;

                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
    }
})();
