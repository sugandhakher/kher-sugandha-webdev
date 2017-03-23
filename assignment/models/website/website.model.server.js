/**
 * Created by sony on 16-03-2017.
 */

module.exports = function(){
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var q = require('q');

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    return api;

    function createWebsite(userId, newWebsite){
        newWebsite._user = userId;
        return Website.create(newWebsite)
    }

    function findAllWebsitesForUser(userId){
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId){
        return Website.findById(websiteId)
    }

    function updateWebsite(websiteId, website){
        var deferred = q.defer();
        Website.findByIdAndUpdate(websiteId, website, function(err, website) {
            if(err)
                deferred.reject(err);
            else
            {
                deferred.resolve(website);
            }
        });

        return deferred.promise;

    }


    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};