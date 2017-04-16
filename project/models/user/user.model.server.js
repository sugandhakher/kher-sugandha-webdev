module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    // create entity manager i.e. object that provides api to talk to db
    var UserInfo = mongoose.model("UserInfo", UserSchema);
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findFacebookUser: findFacebookUser,
        findAllUsers: findAllUsers


    };
    return api;

    function createUser(user) {
        return UserInfo.create(user);
    }


    function findFacebookUser(facebookId) {
        return UserInfo.findOne({"facebook.id": facebookId})
    }

    function findUserById(userId) {
        return UserInfo.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return UserInfo.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return UserInfo.findOne({username: username});
    }

    function updateUser(userId, newUser) {
        delete newUser._id;
        return UserInfo
            .update({_id: userId}, {
                $set: newUser
            })
    }

    function findAllUsers() {
        return UserInfo.find({role: "user"});
    }

    function deleteUser(userId) {
        return UserInfo.remove({_id: userId});
    }
};