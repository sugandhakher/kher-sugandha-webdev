(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "8d50cfed01e93077fc2b6b05d45b2987";
    var secret = "23e35f809e15160f";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        function searchPhotos(searchText){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();