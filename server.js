const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express(); 
const port = process.env.PORT || 5000; 


// HTTP request logger
// Not necessary to build app, but will log every http request in terminal 
app.use(morgan('tiny')); 

// Routes
app.get('/', (req, res) => {
    const data = {
        name: 'Remy', 
        content: 'im a rat',
        date: new Date() 
    }
    res.json(data); 
});

app.get('/name', (req, res) => {
    const data = {
        name: 'Emile', 
        content: 'im also a rat',
        date: new Date() 
    }
    res.json(data); 
});

app.listen(port, () => {
    console.log('Listening on port', port); 
});
