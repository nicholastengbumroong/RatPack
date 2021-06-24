const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    name: String,
    content: String,
    date: {
        type: String,
        defualt: Date.now()
    },
    likes: Number
});

const Comment = mongoose.model('Comment', CommentSchema); 

module.exports = {CommentSchema: CommentSchema, Comment: Comment}; 
