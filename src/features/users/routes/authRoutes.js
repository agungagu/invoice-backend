const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../../middlewares/auth');
const {
  validateUserLogin,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
  changePassword
} = require('../controllers/loginUser');

// POST /api/auth/login - User login (public route)
router.post('/login', validateUserLogin, loginUser);

// Protected routes (require authentication)
router.use(authenticateToken);

// GET /api/auth/me - Get current user profile
router.get('/me', getCurrentUser);

// PUT /api/auth/me - Update current user profile
router.put('/me', updateCurrentUser);

// PUT /api/auth/change-password - Change password
router.put('/change-password', changePassword);

module.exports = router; 