const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/:id', auth, commentCtrl.getAllComments);
router.post('/', auth, commentCtrl.createComment);
router.post('/:id/vote', auth, commentCtrl.setVoteStatus);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;