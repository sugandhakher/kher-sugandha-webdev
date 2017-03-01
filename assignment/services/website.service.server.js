/**
 * Created by sony on 01-03-2017.
 */

module.exports = function(app){
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" , "description": "Welcome to the facebook page"},
        { "_id": "234", "name": "Tweeter",     "developerId": "456" , "description": "Welcome to the Tweeter page"},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" , "description": "Welcome to the Gizmodo page"},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" , "description": "Welcome to the Tic Tac Toe page"},
        { "_id": "678", "name": "Checkers",    "developerId": "123" , "description": "Welcome to the Checkers page"},
        { "_id": "789", "name": "Chess",       "developerId": "234" , "description": "Welcome to the Chess page"}
    ];



    function createWebsite(req,res){
        var newWebsite = req.body;
        var userId = req.params.userId;
        newWebsite._id = new Date().getTime() + "";
        newWebsite.developerId = userId;
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req,res){
        var websitesForUser=[];
        var userId = req.params.userId;

        for(var i in websites){
            if(websites[i].developerId === userId){
                websitesForUser.push(websites[i]);
            }
        }
        res.json(websitesForUser);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                res.send(websites[i]);
                return;
            }
        }
        res.json({});
    }

    function updateWebsite(req,res){
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                websites[i].name = newWebsite.name;
                res.send(200);
                return;
            }
        }
        res.json(400);
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                websites.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.json(400);
    }
};
