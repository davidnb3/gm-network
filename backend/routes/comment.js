const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/:id', commentCtrl.getAllComments);
router.post('/', commentCtrl.createComment);
router.post('/:id/vote', commentCtrl.setVoteStatus);
router.put('/:id', commentCtrl.updateComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;