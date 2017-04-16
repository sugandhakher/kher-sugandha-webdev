(function () {
    angular
        .module("BookMyEvent")
        .controller("EventSearchListController", EventSearchListController);

    function EventSearchListController($routeParams, EventService) {
        var vm = this;
        vm.event = $routeParams.eventName;
        vm.location = $routeParams.location;
        vm.eventByCategory = eventByCategory;

        function init() {
            EventService.getCategories()
                .then(
                    function (response) {
                        vm.categories = response.data.categories;
                    },
                    function (error) {
                        vm.categories = [];
                    }
                );

            EventService.getEvents(vm.event, vm.location)
                .then(
                    function (events) {
                        vm.events = events.data.events;
                    },
                    function (error) {
                        vm.error = "Search did not match any results!!!"
                    }
                );

        }

        init();


        function eventByCategory(category) {
            vm.event = category.replace('&', "and");
            init();
        }
    }
})();