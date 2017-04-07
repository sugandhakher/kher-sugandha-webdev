/**
 * Created by sugandhakher on 4/6/17.
 */

(function(){
    angular
        .module("BookMyEvent")
        .controller("EventSearchController",EventSearchController);

    function EventSearchController($routeParams,EventService){
        var vm = this;
        vm.event = $routeParams.eventName;
        vm.location = $routeParams.location;
        vm.getSafeImageUrl = getSafeImageUrl;
        vm.eventByCategory = eventByCategory;

        function init(){
            EventService.getCategories()
                .then(
                    function(response){
                        vm.categories = response.data.categories;
                    },
                    function(error){
                        vm.categories=[];
                    }
                );

            EventService.getEvents(vm.event, vm.location)
                .then(
                    function(events){
                        vm.events = events.data.events;
                    },
                    function(error){
                        vm.error = "Search did not match any results!!!"
                    }
                );

        }
        init();

        function getSafeImageUrl(logo){
            if(logo){
                return logo.url;
            }else{
                return "../../../img/ear.jpg";
            }
        }

        function eventByCategory(category){
            vm.event = category.replace('&',"and");
            init();
        }
    }
})();