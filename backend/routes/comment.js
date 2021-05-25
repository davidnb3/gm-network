const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/:id', auth, commentCtrl.getAllComments);
router.post('/', auth, commentCtrl.createComment);
router.put('/', auth, commentCtrl.updateComment);
router.delete('/', auth, commentCtrl.deleteComment);

module.exports = router;