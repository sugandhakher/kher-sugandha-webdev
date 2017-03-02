/**
 * Created by sony on 01-03-2017.
 */

module.exports = function(app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);

    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    function createWidget(req,res){
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget.pageId = pageId;
        newWidget._id = new Date().getTime()+"";
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        var widgetsForPage = [];
        for (var i in widgets){
            if(widgets[i].pageId === pageId){
                widgetsForPage.push(widgets[i]);
            }
        }
        res.json(widgetsForPage);
    }

    function findWidgetById(req,res){
        var widgetId = req.params.widgetId;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                res.json(widgets[i]);
                return;
            }
        }
        res.send(400);
    }

    function updateWidget(req,res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.send(400);
    }

    function uploadImage(request, response) {

        var widgetId      = request.body.widgetId;
        var width         = request.body.width;
        var userId        = request.body.userId;
        var websiteId     = request.body.websiteId;
        var pageId        = request.body.pageId;
        var myFile        = request.file;

        if(myFile) {
            var originalname = myFile.originalname;
            var filename = myFile.filename;
            var path = myFile.path;
            var destination = myFile.destination;
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                    if(width){
                        widgets[i].width = width;
                    }else{
                        widgets[i].width = "100%";
                    }

                }
            }
            response.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }else{
            response.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }


    }

};