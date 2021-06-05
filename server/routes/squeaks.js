const router = require('express').Router(); 
let Squeak = require('../models/squeak-form.model'); 

router.route('/').get((req, res) => {
    Squeak
        .find()
        .then(squeaks => res.json(squeaks))
});

function isValidSqueak(squeak) {
    return squeak.name && squeak.name.toString().trim() !== '' &&
        squeak.content && squeak.content.toString().trim() !== '';  
}

router.route('/').post((req, res) => {
    console.log(req.body)
    if(isValidSqueak(req.body)) {
        const squeak = new Squeak ({
            name: req.body.name.toString(),
            content: req.body.content.toString(), 
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

module.exports = router; 

