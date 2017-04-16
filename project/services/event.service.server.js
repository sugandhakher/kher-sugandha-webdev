module.exports = function (app, models) {

    var eventModel = models.eventModel;
    app.post("/project/event", createEvent);
    app.get("/project/event/:eventId", findEventByEventIdFromDb);
    app.get("/project/profile/event/:id", findEventByIdFromDb);

    function createEvent(req, res) {
        var newEvent = req.body;
        eventModel
            .findEventByEventId(newEvent.eventId)
            .then(
                function (event) {
                    if (event) {
                        res.json(event);
                    }
                    else {
                        return eventModel.createEvent(newEvent);
                    }
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findEventByEventIdFromDb(req, res) {
        var eventId = req.params.eventId;
        eventModel
            .findEventByEventId(eventId)
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findEventByIdFromDb(req, res) {
        var id = req.params.id;
        eventModel
            .findEventById(id)
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
};