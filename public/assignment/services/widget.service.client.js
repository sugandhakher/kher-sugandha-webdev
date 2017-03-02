(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);


    function WidgetService($http){
        var api={
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget){
            return $http.post("/api/page/"+pageId+"/widget", widget);
            // widget.pageId = pageId;
            // widgets.push(widget);
            // return widget;
        }

        function findWidgetsByPageId(pageId){
            return $http.get("/api/page/"+pageId+"/widget");
            // return widgets;
        }

        function findWidgetById(widgetId){
            return $http.get("/api/widget/"+widgetId);
            // for (var i in widgets){
            //     if(widgets[i]._id === widgetId){
            //         return widgets[i];
            //     }
            // }
            // return null;
        }

        function updateWidget(widgetId, widget){
            return $http.put("/api/widget/"+widgetId, widget);
            // for (var i in widgets){
            //     if(widgets[i]._id === widgetId){
            //         widgets[i] = widget;
            //         return widget;
            //     }
            // }
            // return null;
        }

        function deleteWidget(widgetId){
            return $http.delete("/api/widget/"+widgetId);
            // for (var i in widgets){
            //     if(widgets[i]._id === widgetId){
            //         widgets.splice(i,1);
            //         return true;
            //     }
            // }
            // return false;
        }
    }
})();
