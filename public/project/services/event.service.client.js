(function () {
    angular
        .module("EventSmart")
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

        function createEvent(event){
            var url = "/project/event";
            return $http.post(url,event);
        }

        function getCategories(){
            var urlBase = "https://www.eventbriteapi.com/v3/categories/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token);
            return $http.get(url);
        }
        function getEvents(event,location) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/search/?q=SEARCH_TEXT&location.address=MY_LOCATION&token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
                .replace("SEARCH_TEXT", event)
                .replace("MY_LOCATION", location);
            return $http.get(url);
        }
        function getEventbyId(eventId) {
            var urlBase = "https://www.eventbriteapi.com/v3/events/"+eventId+"/?token=TOKEN";
            var url = urlBase
                .replace("TOKEN", token)
            return $http.get(url);
        }
        function findEventByEventIdFromDb(eventId){
            var url = "/project/event/" + eventId;
            return $http.get(url);
        }
        function findEventByIdFromDb(id){
            var url = "/project/profile/event/" + id;
            return $http.get(url);
        }
    }
})();