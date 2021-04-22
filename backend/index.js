const express = require('express');
const pool = require('./db');
const app = express();


app.use(express.json());


// ROUTES //

// Sign up

// Sign in

// Get all posts

// Get one post

// Create post

// Update post

// Delete post

// Upvote or Downvote post


// Get all comments

// Create comment

// Update comment

// Delete comment

// Upvote or downvote comment


// Get all posts from topic





app.listen(3000, () => {
  console.log('server started on port 3000')
})