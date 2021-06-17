const express = require('express');
const router = express.Router();
const dateformat = require('dateformat');

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

function isValidPost(post) {
  return post.name && post.name.toString().trim() !== '' &&
    post.content && post.content.toString().trim() !== '';
}

router.post('/save', (req, res) => {
  console.log('Body: ', req.body)

  if (isValidPost(req.body)) {
    let now = new Date();
    formatted = dateformat(now, 'dddd, mmmm dS, yyyy h:MM:ss TT');
    const newSqueak = new Squeak({
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      date: formatted
    });

    newSqueak
      .save((error) => {
        if (error) {
          res.status(500).json({ msg: 'Sorry, internal server errors' });
          return;
        }
        return res.json({
          msg: 'Data has been saved'
        });
      });
  }
  else {
    res.status(422); 
  }
});


// test route
router.get('/name', (req, res) => {
  const data = {
    name: 'Emile',
    content: 'im also a rat',
    date: new Date()
  }
  res.json(data);
});

module.exports = router;
