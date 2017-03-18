/**
 * Created by sony on 01-03-2017.
 */

module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456" }
    // ];

    function createPage(req,res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, page)
            .then(
                function(page){
                    res.json(page);
                }, function(error){
                    res.statusCode(404).send(error);
                }
            );
    }
    //     page._id = new Date().getTime() + "";
    //     page.websiteId = websiteId;
    //     pages.push(page)
    //     res.json(page);
    // }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages){
                    res.json(pages);
                }
            );
    }
    //     var pagesForUser = [];
    //     for(var i in pages){
    //         if(pages[i].websiteId === websiteId){
    //             pagesForUser.push(pages[i]);
    //         }
    //     }
    //     res.json(pagesForUser);
    // }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    res.json(page)
                }, function(error){
                    res.statusCode(404).send(error);
                }
            );
    }
    //     for(var i in pages){
    //         if(pages[i]._id === pageId){
    //             res.send(pages[i]);
    //             return;
    //         }
    //     }
    //     res.send({});
    // }

    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(
                function (success) {
                    res.sendStatus(200);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    //     for(var i in pages){
    //         if(pages[i]._id == pageId){
    //             pages[i].name = page.name;
    //             res.send(200);
    //             return;
    //         }
    //     }
    //     res.send(400);
    // }

    function deletePage(req,res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function(success){
                    res.send(200);
                }, function(error){
                    res.statusCode(404).send(error);
                }
            );
    }
    //     for(var i in pages){
    //         if(pages[i]._id === pageId){
    //             pages.splice(i,1);
    //             res.sendStatus(200);
    //             return;
    //         }
    //     }
    //     res.send(400);
    // }

};
