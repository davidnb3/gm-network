const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topic');
const auth = require('../middleware/auth');

router.get('/', auth, topicCtrl.getAllTopics);
router.post('/', auth, topicCtrl.getTopicPosts);

module.exports = router;