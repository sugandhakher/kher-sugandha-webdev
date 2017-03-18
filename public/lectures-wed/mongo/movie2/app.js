/**
 * Created by sony on 15-03-2017.
 */

(function(){
    angular
        .module('movies', [ngRoute])
        .config(configuration);

    function configuration($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    }

})