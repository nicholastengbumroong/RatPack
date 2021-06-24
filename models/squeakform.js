const mongoose = require('mongoose');
const {CommentSchema} = require('./commentform');

// Schema
const Schema = mongoose.Schema;
const SqueakFormSchema = new Schema({
    name: String,
    content: String,
    date: {
        type: String,
        defualt: Date.now()
    },
    likes: Number,
    comments: [CommentSchema]
});

// Model
const Squeak = mongoose.model('Squeak', SqueakFormSchema);

module.exports = Squeak;