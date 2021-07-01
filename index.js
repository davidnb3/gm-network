const express = require('express');

const postRoutes = require('./routes/post');
const topicRoutes = require('./routes/topic');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const path = require('path');
const cors = require('cors')
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
};

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/comments', commentRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});