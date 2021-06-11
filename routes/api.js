const express = require('express'); 
const router = express.Router(); 

const Squeak = require('../models/squeakform'); 

// Routes
router.get('/', (req, res) => {
    Squeak
        .find()
        .then((data) => {
            res.json(data); 
        })
        .catch((error) => {
            console.log('Error: ', daerrorta); 
        });
});

router.post('/save', (req, res) => {
    console.log('Body: ', req.body)
    const newSqueak = new Squeak({
        name: req.body.name.toString(), 
        content: req.body.content.toString()
    });

    newSqueak
        .save((error) => {
            if (error) {
                res.status(500).json({ msg: 'Sorry, internal server errors'});
                return; 
            }
            return res.json({
                msg: 'Data has been saved'
            });
        });

});



router.get('/name', (req, res) => {
    const data = {
        name: 'Emile', 
        content: 'im also a rat',
        date: new Date() 
    }
    res.json(data); 
});

module.exports = router;