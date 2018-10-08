const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const ObjectId = Schema.ObjectId;

// imports
var Events = require('./model/events');

var Users = new Schema({
    id: {type: ObjectId, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    events: [{ type: Schema.Types.ObjectId, ref: 'Events' }]
});

Users.pre('save', function(next) {
    var user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('Users', Users);