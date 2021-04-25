const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topic');

router.get('/', topicCtrl.getAllTopics);
router.get('/:id', topicCtrl.getTopicPosts);

module.exports = router;