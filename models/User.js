const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema, 'users');