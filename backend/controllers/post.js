const pool = require('../middleware/db');

exports.getAllPosts = () => {

};
exports.getTopicPosts = () => {

};
exports.getOnePost = () => {

};

exports.createPost = async (req, res) => {
  try {
    // Get form data form request body
    const {user_id, topic_id, title, body} = req.body;
    // Save form data to database table 'posts'
    const newPost = await pool.query(
      'INSERT INTO posts (user_id, topic_id, post_title, post_body, created_on) \
      VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, topic_id, title, body, new Date()]
    );
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.setVoteStatus = () => {

};
exports.updatePost = () => {

};
exports.deletePost = () => {

};


