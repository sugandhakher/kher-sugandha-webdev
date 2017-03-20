/**
 * Created by sony on 19-03-2017.
 */

(function(){
    angular.module("wamDirectives",[])
        .directive("wamSortable",wamSortable);

    function wamSortable(){

        function linker(scope, element, attributes) {
            var data = scope.data;
            var myScope = scope;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("#widgetList")
                .sortable({
                    axis: 'y',
                    start: function(event,ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function(event,ui) {
                        endIndex = ui.item.index();
                        myScope.callback({start:startIndex, end:endIndex});
                    }
                });
        }

        return{
            templateUrl: "/assignment/views/widget/templates/widget-list.html",
            scope:{
                widgetList: "=data",
                callback: "&",
                model: "=model"
            },
            link : linker
        }
    }

})();