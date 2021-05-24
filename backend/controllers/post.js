const pool = require('../middleware/db');

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await pool.query(
      'SELECT * FROM posts p \
      JOIN users u ON p.user_id = u.user_id \
      JOIN topics t ON p.topic_id = t.topic_id \
      ORDER BY p.created_on DESC'
    );
    res.status(200).json(allPosts.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const {id} = req.params;
    const selectedPost = await pool.query(
      'SELECT * FROM posts p \
      JOIN users u ON p.user_id = u.user_id \
      JOIN topics t ON p.topic_id = t.topic_id \
      WHERE p.post_id = $1', [id]
    );
    res.status(200).json(selectedPost.rows[0]);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    // Get form data from request body
    const {user_id, topic_id, title, body} = req.body;
    // Save form data to database table 'posts'
    const newPost = await pool.query(
      'INSERT INTO posts (user_id, topic_id, post_title, post_body, created_on) \
      VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, topic_id, title, body, new Date()]
    );
    res.status(200).json(newPost.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const {topic_id, title, body} = req.body;
    const {id} = req.params;
    const updatedPost = await pool.query(
      'UPDATE posts SET topic_id = $1, post_title = $2, post_body = $3 \
      WHERE post_id = $4 RETURNING *',
      [topic_id, title, body, id]
    );
    res.status(200).json(updatedPost.rows[0]);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;
    await pool.query(
      'DELETE FROM posts WHERE post_id = $1 AND user_id = $2', [id, userId]
    );
    res.status(200).json({message: 'Post successfully deleted!'});
  } catch (error) {
    res.status(404).json(error);
  }
};


