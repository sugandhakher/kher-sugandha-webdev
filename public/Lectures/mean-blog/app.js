angular
    .module('BlogApp', [])
    .controller('BlogController', BlogController)
function BlogController($scope, $http){

    $http.get('/blog').success(function(response){
        console.log(response);
        $scope.blogPosts = response;
    });

    // $scope.blogPosts = [
    //     {title: 'My new years party', body: 'none of your business'},
    //     {title: 'ABCD', body: 'yo man'}
    //     // {title: 'Post3', content: 'Content3'},
    //     // {title: 'Post4', content: 'Content4'},
    //     // {title: 'Post5', content: 'Content5'}
    // ];

    $scope.createPosts = createPosts;
    $scope.deletePost = deletePost;
    $scope.deleteAll = deleteAll;
    $scope.selectPost = selectPost;
    $scope.post = {};
    $scope.updatePosts = updatePosts;

    function updatePosts (post) {
        $scope.blogPosts[$scope.indexPost ].title = post.title;
        $scope.blogPosts[$scope.indexPost ].body = post.body;

    }

    function selectPost(post){
        $scope.indexPost = $scope.blogPosts.indexOf(post);
        console.log($scope.indexPost);
        $scope.post.title = post.title;
        $scope.post.body = post.body;
    }

    function deleteAll(){
        $scope.blogPosts = [];
    }

    function createPosts (post) {
        // console.log(post);
        var newPost = {
            title: post.title,
            body: post.body
        };

        $scope.blogPosts.push(newPost);
    }
    function deletePost(post) {
        console.log(post);
        var indexPost = $scope.blogPosts.indexOf(post);
        $scope.blogPosts.splice(indexPost, 1)
    }
}