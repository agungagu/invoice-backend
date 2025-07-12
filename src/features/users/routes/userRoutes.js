const express = require('express');
const userRoutes = express.Router();
const { authenticateToken } = require('../../../middlewares/auth');

const registerUser = require('../controllers/registerUser');
const getAllUsers = require('../controllers/getAllUsers');
const getUserById = require('../controllers/getUserById');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');

const { validateUserRegistration } = require('../middlewares/validateUser');
const { requireAdmin } = require('../middlewares/requireAdmin');

// All routes require authentication and admin privileges
userRoutes.use(authenticateToken);
userRoutes.use(requireAdmin);

userRoutes.post('/register', validateUserRegistration, registerUser);
userRoutes.get('/read', getAllUsers);
userRoutes.get('/read/:id', getUserById);
userRoutes.put('/update/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

module.exports = userRoutes;
