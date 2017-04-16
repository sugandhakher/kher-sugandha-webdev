module.exports = function (app, models) {

    var commentModel = models.commentModel;
    app.post("/project/comment", createComment);
    app.get("/project/comment/:eventId", findCommentByEventId);
    app.delete("/project/comment/:commentId", removeComment);

    function createComment(req, res) {
        var newComment = req.body;
        var userId = req.params.userId;
        commentModel
            .createComment(newComment)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findCommentByEventId(req, res) {
        var eventId = req.params.eventId;
        commentModel
            .findCommentByEventId(eventId)
            .then(
                function (comments) {
                    res.json(comments);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function removeComment(req, res) {
        var commentId = req.params.commentId;

        commentModel
            .removeComment(commentId)
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