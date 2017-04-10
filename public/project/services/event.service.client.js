(function () {
    angular
        .module("BookMyEvent")
        .factory("EventService", EventService);

    var token = "3P3RTUFC5AY5KH7AZEYX";
    var secret = "WQSBG4CIKGPA6IWMRVDM7EHZS2AOF4AKFJBZBIXRGIIHK5CFP4";

    function EventService($http) {
        var api = {
            getEvents: getEvents,
            getCategories: getCategories,
            getEventbyId: getEventbyId,
            findEventByEventIdFromDb: findEventByEventIdFromDb,
            findEventByIdFromDb: findEventByIdFromDb,
            createEvent: createEvent

        };
        return api;

        function createEvent(event) {
            return $http.post("/project/event", event);
        }

        function getCategories() {
            var urlBase = "https://www.eventbriteapi.com/v3/categories/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token);
            return $http.get(url);
        }

        function getEvents(event, location) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&location.address=MY_LOCATION&token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
                .replace("SEARCH_TEXT", event)
                .replace("MY_LOCATION", location);
            return $http.get(url);
        }

        function getEventbyId(eventId) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/" + eventId + "/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
            return $http.get(url);
        }

        function findEventByEventIdFromDb(eventId) {
            return $http.get("/project/event/" + eventId);
        }

        function findEventByIdFromDb(id) {
            return $http.get("/project/profile/event/" + id);
        }
    }
})();