const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    registerUser, 
    loginUser, 
    getUsers, 
    updateUser, 
    deleteUser,
    batchDeleteUsers
} = require('../controllers/userController');

/**
 * User Routes
 * Defines all API endpoints for user management
 */

// Public Routes (No Authentication Required)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes (Authentication Required)
router.get('/all', protect, getUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.post('/batch-delete', protect, batchDeleteUsers);

module.exports = router; 