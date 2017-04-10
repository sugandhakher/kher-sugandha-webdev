module.exports = function () {

    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var Comment = mongoose.model("Comment", CommentSchema);
    var api = {
        createComment: createComment,
        findCommentByUserName: findCommentByUserName,
        findCommentByEventId: findCommentByEventId,
        removeComment: removeComment
    };
    return api;

    function createComment(comment) {
        return Comment.create(comment);
    }

    function findCommentByUserName(username) {
        return Comment.find({"username": username})
    }

    function findCommentByEventId(eventId) {
        return Comment.find({"eventId": eventId}).sort({dateCreated: 1});
    }

    function removeComment(commentId) {
        return Comment.remove({_id: commentId});
    }
};