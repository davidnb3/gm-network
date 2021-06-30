const pool = require('../db');

exports.getAllTopics = async (req, res) => {
  try {
    const allTopics = await pool.query(
      'SELECT * FROM topics ORDER BY topic_id ASC'
    );
    res.status(200).json(allTopics.rows);
   } catch (error) {
    res.status(404).json(error);
  }
};

exports.getTopicPosts = async (req, res) => {
  try {
    const {topic_id} = req.body;
    const allTopicPosts = await pool.query(
      'SELECT * FROM posts p\
      JOIN users u ON p.user_id = u.user_id \
      JOIN topics t ON p.topic_id = t.topic_id \
      WHERE p.topic_id = $1 \
      ORDER BY p.created_on DESC', [topic_id]
    );
    res.status(200).json(allTopicPosts.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};