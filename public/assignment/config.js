(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/views/user/login.view.client.html",
                controller: 'loginController',
                controllerAs:'model'
            })
            .when("/register",{
                templateUrl: "/views/user/register.view.client.html",
            })
            .when("/profile/:uid",{
                templateUrl: "/views/user/profile.view.client.html",
                controller: 'profileController',
                controllerAs:'model'
            })
            .when("/website",{
                templateUrl: "/views/website/website-list.view.client.html",
                controller: 'WebsiteListController',
                // controllerAs:'model'
            })
            .when("/website/new",{
                templateUrl: "/views/website/website-new.view.client.html",
                // controller: 'profileController',
                // controllerAs:'model'
            })
            .when("/website/:wid",{
                templateUrl: "/views/website/website-edit.view.client.html",
                // controller: 'profileController',
                // controllerAs:'model'
            })
            .otherwise({
                redirectTo: "/login"
            });

    }
})();
