const pool = require('../middleware/db');

exports.getAllTopics = async (req, res) => {
  try {
    const allTopics = await pool.query(
      'SELECT * FROM topics'
    );
    res.status(200).json(allTopics.rows);
   } catch (error) {
    res.status(404).json(error);
  }
};

exports.getTopicPosts = async (req, res) => {
  try {
    const {id} = req.params;
    const allTopicPosts = await pool.query(
      'SELECT * FROM posts WHERE topic_id = $1', [id]
    );
    res.status(200).json(allTopicPosts.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};