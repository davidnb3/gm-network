const express = require('express');

const postRoutes = require('./routes/post');
const topicRoutes = require('./routes/topic');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const cors = require('cors')

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);

app.listen(5000, () => {
  console.log('server started on port 5000')
})