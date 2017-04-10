(function () {
    angular
        .module("BookMyEvent")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var api = {
            createComment: createComment,
            findCommentByEventId: findCommentByEventId,
            removeComment: removeComment
        };
        return api;

        function removeComment(commentId) {
            return $http.delete("/project/comment/" + commentId);
        }

        function createComment(comment) {
            return $http.post("/project/comment", comment);
        }

        function findCommentByEventId(eventId) {
            return $http.get("/project/comment/" + eventId);
        }

        function getCategories() {
            var urlBase = "https://www.eventbriteapi.com/v3/categories/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token);
            return $http.get(url);
        }

        function getEvents(event, location) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
                .replace("SEARCH_TEXT", event);
            return $http.get(url);
        }

        function getEventbyId(eventId) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/" + eventId + "/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token);
            return $http.get(url);
        }
    }
})();