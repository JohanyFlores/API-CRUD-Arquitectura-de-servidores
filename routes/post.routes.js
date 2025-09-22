const express = require ('express');
const router = express.Router ();
const postController = require ('../controllers/post.controller');



router.get ('/:id', postController.getPostById);
router.patch ('/:id', postController.updatePost);
router.delete ('/:id', postController.deletePost);
router.post ('/', postController.createPost);
router.get ('/', postController.getAllPosts);

module.exports = router;
