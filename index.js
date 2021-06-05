const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const path = require('path');
require('dotenv').config();

const app = express(); 

const http = require('http'); 
const port = process.env.PORT || 5000

const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/ratpack'


//connecting to the database
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//schema
const Schema = mongoose.Schema;
const squeakFormSchema = new Schema({
    name: String,
    content: String,
    date: {
        type: String, 
        default: Date.now()
    }
});

//model 
const Squeak = mongoose.model('Squeak', squeakFormSchema); 

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected'); 
});

app.listen(port, () => {
    console.log('Listening on port', port); 
});

/*
const squeaks = db.get('squeaks'); 

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.json({
        message: 'RatPack'
    });
});

app.get('/squeaks', (request, response) => {
    squeaks 
        .find() 
        .then(squeaks => {
            response.json(squeaks);
        })
});

function isValidSqueak(squeak) {
    return squeak.name && squeak.name.toString().trim() !== '' &&
        squeak.content && squeak.content.toString().trim() !== '';  
}

app.post('/squeaks', (request, response) => {
    console.log(request.body)
    if(isValidSqueak(request.body)) {
        const squeak = {
            name: request.body.name.toString(),
            content: request.body.content.toString(), 
            created: new Date()
        };

        // inserting into the database after validation
        // ?????????? what is this syntax??
        squeaks
            .insert(squeak)
            .then(createdSqueak => {
                response.json(createdSqueak); 
            });
    }
    else {
        response.status(422);
        response.json({
            message: 'NAME AND CONTENT REQUIRED'
        });    
    }
});
*/

