/**
 * Created by sugandhakher on 4/6/17.
 */

(function () {
    angular
        .module("BookMyEvent")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"

            })
            .when("/user/project/profile/:username", {
                templateUrl: "views/user/member-profile.view.client.html",
                controller: "MemberController",
                controllerAs: "model"

            })
            .when("/user/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"

            })
            .when("/event/:eventName/location/:location", {
                templateUrl: "views/event/event-search-list.view.client.html",
                controller: "EventSearchController",
                controllerAs: "model"

            })
            .when("/event/:eventId", {
                templateUrl: "views/event/event-detail.view.client.html",
                controller: "EventDetailController",
                controllerAs: "model"

            })


            .when("/admin", {
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model"

            })

    }


})();
