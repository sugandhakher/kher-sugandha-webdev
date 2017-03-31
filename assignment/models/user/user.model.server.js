/**
 * Created by sony on 16-03-2017.
 */

module.exports = function(){

    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server.js")();

    var User = mongoose.model("User", UserSchema);

    var q = require('q');

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function createUser(user){
        var deferred = q.defer();
        User.create(user, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;

    }


    function findUserById(userId){
        var deferred = q.defer();
        User.findById(userId, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;

    }

    function findUserByUsername(username){
        var deferred = q.defer();
        User.findOne({username: username}, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;

    }

    function findUserByCredentials(username, password){
        var deferred = q.defer();
        User.findOne({username: username, password: password}, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;

    }

    function updateUser(userId, user){
        var deferred = q.defer();
        User.findByIdAndUpdate(userId, user, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;

    }

    function deleteUser(userId){
        var deferred = q.defer();
        User.findByIdAndRemove(userId, function(err, user) {
            if(err)
                deferred.reject(err);
            else
            {
                user.remove();
                deferred.resolve(user);
            }
        });

        return deferred.promise;

    }

};