const express = require('express');
const router = express.Router();
const dateformat = require('dateformat');

const Squeak = require('../models/squeakform');
const {Comment} = require('../models/commentform');

// Routes
router.get('/', (req, res) => {
  Squeak
    .find()
    .sort({date: -1})
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

// post route
router.post('/save', (req, res) => {
  console.log('Body: ', req.body)

  if (isValidPost(req.body)) {
    let now = new Date();
    formatted = dateformat(now, 'h:MM TT ∙ mmm d, yyyy');
    const newSqueak = new Squeak({
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      date: formatted,
      likes: req.body.likes
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


// like route
router.post('/like', (req, res) => {
  if(req.body.likeState) {
    Squeak.findByIdAndUpdate(req.body.postID, {$inc: {likes: 1 }}, {new: true}, (err) => {
      if (err) {
        res.json(err); 
      }
    });
  }
  else {
    Squeak.findByIdAndUpdate(req.body.postID, {$inc: {likes: -1}}, {new: true}, (err) => {
      if (err) {
        res.json(err);
      }
    });
  }

});

// comment post route
router.post('/save-comment', (req, res) => {
  console.log('Body: ', req.body)

  if (isValidPost(req.body)) {
    let now = new Date();
    formatted = dateformat(now, 'h:MM TT ∙ mmm d, yyyy');
    const newComment = new Comment({
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      date: formatted,
      likes: req.body.likes
    });

  Squeak.findByIdAndUpdate(
    {_id: req.body.post._id},
    {$push: {
      comments: {
         $each:[newComment], 
         $position: 0
      }
    }},
    (err) => {
      if (err) {
        res.status(500).json({msg: 'Sorry, internal server errors'})
      }
    }
  ); 

  }
});

// comment like route
router.post('/comment-like', (req, res) => {
  console.log(req.body); 
  if(req.body.likeState) {
    Squeak.findOneAndUpdate(
      {_id: req.body.parentID},
      {$inc: {'comments.$[comment].likes': 1}},
      {arrayFilters: [{'comment._id': req.body.commentID}]},
      (err) => {
        if (err) {
          res.json(err); 
        }
    });
  }
  else {
    Squeak.findByIdAndUpdate(req.body.postID, {$inc: {likes: -1}}, {new: true}, (err) => {
      if (err) {
        res.json(err);
      }
    });
  }

});

module.exports = router;
