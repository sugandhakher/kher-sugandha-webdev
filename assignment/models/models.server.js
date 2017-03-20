/**
 * Created by sony on 16-03-2017.
 */

module.exports = function () {

    // import mongoose library
    var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/spring2017';
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };
    return models;
};