const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topic');

router.get('/', topicCtrl.getAllTopics);
router.post('/', topicCtrl.getTopicPosts);

module.exports = router;