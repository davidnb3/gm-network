const pool = require('../middleware/db');

exports.getAllComments = async (req, res) => {
  try {
    const {id} = req.params;
    const allComments = await pool.query(
      'SELECT * FROM comments c \
      INNER JOIN users u ON c.user_id = u.user_id \
      WHERE post_id = $1 ORDER BY c.created_on DESC',
      [id]
    );
    res.status(200).json(allComments.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.createComment = async (req, res) => {
  try {
    // Get form data from request body
    const {user_id, post_id, body} = req.body;
    // Save form data to database table 'comments'
    const newComment = await pool.query(
      'INSERT INTO comments (user_id, post_id, comment_body, created_on) \
      VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, post_id, body, new Date()]
    );
    res.status(200).json(newComment.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const {body} = req.body;
    const {id} = req.params;
    const updatedComment = await pool.query(
      'UPDATE comments SET comment_body = $1 \
      WHERE comment_id = $2 RETURNING *',
      [body, id]
    );
    res.status(200).json(updatedComment.rows[0]);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const {id} = req.params;
    await pool.query(
      'DELETE FROM comments WHERE comment_id = $1', [id]
    );
    res.status(200).json({message: 'Comment successfully deleted!'});
  } catch (error) {
    res.status(404).json(error);
  }
}
