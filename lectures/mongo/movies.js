/**
 * Created by sony on 13-03-2017.
 */

//console.log('movies');

module.exports = function(app){
    var mongoose = require ('mongoose');

    app.post('/api/evening/movie', createMovie);
    app.get('/api/evening/movie', findAllMovies);
    app.get('/api/evening/movie/:movieId', findMovieById);
    app.delete('/api/evening/movie/:movieId', deleteMovie);
    app.put('/api/evening/movie/:movieId', updateMovie);




    var MovieSchema = mongoose.Schema({
        title: {type: String, required: true},
        rating: {type: String, enum: ['G', 'PG', 'PG-13', 'R']},
        plot: String,
        cast: [String],
        poster: String,
        relaeseDate: Date,
        boxoffice: Number,
        created: {type: Date, default: Date.now}
    }, {collection: 'movie.wed'});

    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    function updateMovie(req, res){
        var movieId = req.params.movieId;
        var movie = req.body;
        delete movie._id;
        MovieModel
            .update({_id: movieId},
                {$set: movie})
            .then(function(status){
                res.sendStatus(200)
            }, function error(){
                res.sendStatus(500).send(error);
            });
    }

    function deleteMovie(req, res){
        var movieId = req.params.movieId;
        MovieModel
            .remove({_id: movieId})
            .then(function(status){
                res.json(200);
            }, function(error){
                res.sendStatus(500).send(error);
            });
    }

    function createMovie(req, res){
        var movie = req.body;
        MovieModel
            .create(movie)
            .then(function(movie){
                res.json(movie);
            }, function(err){
                res.sendStatus(400).send(err);
            })
    }

    function findMovieById(req, res){
        var movieId = req.params.movieId;
        MovieModel
            .findById(movieId)
            .then(function(movie){
                res.json(movie);

            })

    };

    function findAllMovies(req, res){
      MovieModel
          .find()
          .then(function(movies){
              res.json(movies);
          });
    }

    //MovieModel.create({title: 'Avatar'});
    //MovieModel.create({title: 'Terminator3'});
    //MovieModel.create({title: 'Aliens', cast:['Sigorney West', 'Jennnifer Lawrence']});

    //var movies = MovieModel.find();
    //MovieModel
        //.find({_id:'58c625b00781c806648ad394'})
        //.findById('58c625b00781c806648ad394')
        // .update(
        //     {_id: '58c625b00781c806648ad394'},
        //     {$set: {rating: 'R'}}
        // )
        // .then(function(movies){
        //     console.log(movies);
        // });
    // MovieModel
    //     .remove({title: 'Aliens'})
    //     .then(function(status){
    //         console.log(status);
    //     }, function (error){
    //         console.log(error);
    //
    //     });




};

