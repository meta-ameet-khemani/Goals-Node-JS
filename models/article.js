const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    decription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('article', ArticleSchema, 'article');