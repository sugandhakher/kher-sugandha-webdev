module.exports = function () {

    var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/project2017';
    if (process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server.js")(),
        commentModel: require("./comment/comment.model.server.js")(),
        eventModel: require("./event/event.model.server.js")(),
        followModel: require("./follow/follow.model.server.js")()
    };
    return models;
};
