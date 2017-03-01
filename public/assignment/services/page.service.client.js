/**
 * Created by sony on 15-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);


    function PageService($http){
        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function createPage(websiteId, page){
            return $http.post("/api/website/"+websiteId+"/page", page);
            // page.websiteId = websiteId;
            // pages.push(page);
            // return page;

        }

        function findPageByWebsiteId(websiteId){
            return $http.get("/api/website/"+websiteId+"/page")
            // var pagesForUser = [];
            // for(var i in pages){
            //     if(pages[i].websiteId === websiteId){
            //         pagesForUser.push(pages[i]);
            //     }
            // }
            // return pagesForUser;
        }

        function findPageById(pageId){
            return $http.get("/api/page/"+pageId)
            // for(var i in pages){
            //     if(pages[i]._id === pageId){
            //         return pages[i];
            //     }
            // }
            // return null;
        }

        function updatePage(pageId, page){
            return $http.put("/api/page/"+pageId, page)
            // for(var i in pages){
            //     if(pages[i]._id === pageId){
            //         pages[i].name = page.name;
            //         return page;
            //     }
            // }
            // return null;
        }

        function deletePage(pageId){
            return $http.delete("/api/page/"+pageId)
            // for(var i in pages){
            //     if(pages[i]._id === pageId){
            //         pages.splice(i,1);
            //         return true;
            //     }
            // }
            // return false;
        }
    }

})();