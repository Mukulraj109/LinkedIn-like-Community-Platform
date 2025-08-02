const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getCurrentUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

router.get('/me', protect, getCurrentUser);
router.get('/:id', getUserProfile);
router.put('/:id', protect, validateUser, updateUserProfile);

module.exports = router;