/**
 * Created by sony on 16-03-2017.
 */

module.exports = function(){
    var mongoose = require("mongoose");

    var q = require('q');
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page){
        page._website = websiteId;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId){
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId){
        return Page.findById({_id: pageId});
    }

    function updatePage(pageId, page){
        delete page._id;
        return Page.update({_id: pageId},{
        $set: page})
    }

    function deletePage(pageId){
        return Page.remove({_id: pageId});
    }

}