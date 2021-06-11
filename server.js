const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors'); 
const path = require('path');

const app = express(); 
const port = process.env.PORT || 5000; 

const routes = require('./routes/api');

// will need to hide using dotenv 
const MONGODB_URI = "mongodb+srv://NickTeng:August1900!@cluster0.6zugf.mongodb.net/RatPack?retryWrites=true&w=majority"
const conn = MONGODB_URI || 'mongodb://localhost/5000/ratpack'

// connect to the mongo database
mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//check if mongoose is connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected'); 
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// HTTP request logger
app.use(morgan('tiny')); 
app.use('/api', routes); 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(port, () => {
    console.log('Listening on port', port); 
});
