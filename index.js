const express = require('express'); 
const cors = require('cors'); 

const app = express(); 

const http = require('http'); 
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
  });
  
  server.listen(port,() => {
    console.log(`Server running at port `+port);
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

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

*/