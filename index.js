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

//check if the mongoose if connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected'); 
});

//app will listen to either heroku or local port 
app.listen(port, () => {
    console.log('Listening on port', port); 
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.json({
        message: 'RatPack'
    });
});

app.get('/squeaks', (req, res) => {
    Squeak
        .find() 
        .then(squeaks => {
            res.json(squeaks);
        })
});

function isValidSqueak(squeak) {
    return squeak.name && squeak.name.toString().trim() !== '' &&
        squeak.content && squeak.content.toString().trim() !== '';  
}

app.post('/squeaks', (req, res) => {
    console.log(req.body)
    if(isValidSqueak(req.body)) {
        const squeak = new Squeak ({
            name: req.body.name.toString(),
            content: req.body.content.toString(), 
            created: new Date()
        });

        squeak
            .save()
            .then(createdSqueak => {
                res.json(createdSqueak); 
            });
    }
    else {
        res.status(422);
        res.json({
            message: 'NAME AND CONTENT REQUIRED'
        });    
    }
});


