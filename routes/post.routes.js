const express = require ('express');
const router = express.Router ();
const postController = require ('../controllers/post.controller');
const auth  = require  ('../middleware/secure.middleware')


router.get('/:id', auth, postController.getPostById);
router.patch('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/', auth, postController.createPost);
router.get('/', auth, postController.getAllPosts);


module.exports = router;
