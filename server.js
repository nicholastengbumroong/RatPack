const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors'); 
const path = require('path');
require('dotenv').config()

const app = express(); 
const port = process.env.PORT || 5000; 

const routes = require('./routes/api');

const conn = process.env.MONGODB_URI || 'mongodb://localhost/5000/ratpack';

// connect to the mongo database
mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
});

//check if mongoose is connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected'); 
});

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));     // look up what this does

// HTTP request logger
app.use(morgan('tiny')); 


app.use('/api', routes); 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(port, () => {
    console.log('Listening on port', port); 
});
