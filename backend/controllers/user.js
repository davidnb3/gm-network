const pool = require('../middleware/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const {email, username, password} = req.body;
  console.log(email, username, password);
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1' ,
      [email]
    );
    if (user.rows.length > 0) {
      return res.status(401).json('User already exists.')
    }
    if (req.body.password && email && username) {
      const hashedPassword = await bcrypt.hash(password, 10);
      pool.query('INSERT INTO users (user_email, user_name, user_pw, created_on) \
        VALUES ($1, $2, $3, $4) RETURNING user_email, user_name',
        [email, username, hashedPassword, new Date()]
      )
      res.status(200).json({message: 'Account successfully created!'})
    }
  } catch (error) {
    res.status(500).json(error);
  }
}


exports.login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const userData = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);
    const user = userData.rows[0];
    bcrypt.compare(password, user.user_pw).then((valid) => {
      if (!valid) {
        return res.status(401).json({error: 'Incorrect password!'});
      }
      const token = jwt.sign(
        {userId: user.user_id},
        'token_secret',
        {expiresIn: '24h'}
      );
      res.status(200).json({
        userId: user.user_id,
        authentication: token,
        message: 'Logged in successfully!'
      });
    }).catch((error) => {
      res.status(401).json(error)
    })
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getUserData = async (req, res) => {
  try {
    const {userId} = req.body;
    const userData = await pool.query('SELECT user_email, user_name, created_on \
    FROM users WHERE user_id = $1' , [userId]);
    res.status(200).json(userData.rows)
  } catch (error) {
    res.status(404).json(error)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const {userId} = req.body;
    await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
    res.status(200).json({message: 'User deleted successfully!'})
  } catch (error) {
    res.status(500).json(error);
  }
}