const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const squeakFormSchema = new Schema({
    name: String,
    content: String,
    date: {
        type: String, 
        default: Date.now()
    }
});

const Squeak = mongoose.model('Squeak', squeakFormSchema); 

module.exports = Squeak; 
