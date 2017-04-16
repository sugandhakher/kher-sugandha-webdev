(function () {
    angular
        .module("BookMyEvent", ["ngRoute", "ngRating"])
        .controller("EventController", EventController);


    function EventController($location, $anchorScroll, UserService, $route, $rootScope) {
        var vm = this;
        vm.scrollTo = scrollTo;
        vm.logout = logout;
        vm.searchEvent = searchEvent;

        function searchEvent(eventName, SearchEventForm) {
            if ($('#srch-term').val() != "")
                $location.url("/event/" + eventName + "/location/boston");
        }

        function scrollTo(id) {
            $location.url("/");
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/");
                        $route.reload();
                    },
                    function (error) {
                        $location.url("/");
                        $route.reload();
                    }
                );
        }
    }
})();
