module.exports = function (app) {
    var blogPosts = [
            {title: 'My new years party', body: 'none of your business'},
            {title: 'ABCD', body: 'yo man'}

    ];
    app.get('/blog', findAllBlogPosts);

    function findAllBlogPosts(req, res){
        res.json(blogPosts)

    }


    // app.get('/hello', function (req, res){
    //     res.json({message:'hello world from server'});
    // });
 };