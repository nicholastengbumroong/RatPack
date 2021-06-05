const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const path = require('path'); 

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 5000; 
const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/ratpack'

//connecting to the database
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//check if mongoose is connected
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established'); 
});

// middleware 
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

const squeaksRouter = require('./routes/squeaks');
app.use('./squeaks', squeaksRouter);

app.listen(port, () => {
   console.log('Server is running on port', port);  
});