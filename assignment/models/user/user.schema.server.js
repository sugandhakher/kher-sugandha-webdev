/**
 * Created by sony on 16-03-2017.
 */

module.exports = function(app){
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        facebook: {
            id:    String,
            token: String
        },
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'assignment.user'});

    return UserSchema;

};
