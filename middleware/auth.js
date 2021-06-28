const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Checks authentication token before any request made to server
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'token_secret');
     // Extract userID from the token
     const userId = decodedToken.userId;
     if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid User ID';
    } else {
        next();
    }
  } catch (error) {
    res.status(401).json({error: new Error('Invalid request.')});
  }
}