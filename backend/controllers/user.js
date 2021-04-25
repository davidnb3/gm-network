const pool = require('../middleware/db');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
  // Hash password in request body
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const hashedPassword = hash;
      const {email, username} = req.body;
      // Check if every field contains a value
      if (req.body.password && email && username) {
        // Save data to database table 'users'
        pool.query('INSERT INTO users (user_email, user_name, user_pw, created_on) \
          VALUES ($1, $2, $3, $4) RETURNING user_email, user_name',
          [email, username, hashedPassword, new Date()]
        ).then(
          () => res.status(200).json({message: 'Account successfully created!'})
        ).catch((error) => res.status(500).json(error));
      } else {
        res.status(400).json({error: 'Bad Request.'})
      }

    }).catch((error) => {
      res.status(500).json(error);
    })
};

exports.login = async (req, res) => {
  try {
    const {username, password} = req.body;
    // Check if usernmae exists in database
    await pool.query(
      'SELECT * FROM users WHERE user_name = $1', [username]
      ).then(
        // Get the user's record from database
        (data) => {return data.rows[0]} 
      ).then(
        // Compare request body password with saved hashed password
        (user) => {return bcrypt.compare(password, user.user_pw)} 
      ).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({error: 'Incorrect password!'});
          }
          res.status(200).json({message: 'Logged in successfully!'});
        }
      ).catch((error) => res.status(404).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
}