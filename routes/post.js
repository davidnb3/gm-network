const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/postsread/:user', auth, postCtrl.getReadPosts);
router.post('/', auth, postCtrl.createPost);
router.post('/:id', auth, postCtrl.checkPostsRead);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;