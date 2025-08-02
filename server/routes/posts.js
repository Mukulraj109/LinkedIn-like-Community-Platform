const express = require('express');
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getUserPosts
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { validatePost } = require('../middleware/validation');

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(protect, validatePost, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, validatePost, updatePost)
  .delete(protect, deletePost);

router.get('/user/:userId', getUserPosts);

module.exports = router;