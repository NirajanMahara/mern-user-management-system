const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * User Controller
 * Handles all user-related operations and business logic
 */

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
exports.registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, ...rest } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            ...rest
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Authenticate user and get token
 * @route POST /api/users/login
 * @access Public
 */
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Verify user credentials
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get all users
 * @route GET /api/users/all
 * @access Private
 */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Update user
 * @route PUT /api/users/:id
 * @access Private
 */
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Delete user
 * @route DELETE /api/users/:id
 * @access Private
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Batch delete users
 * @route POST /api/users/batch-delete
 * @access Private
 */
exports.batchDeleteUsers = async (req, res) => {
    try {
        const { ids } = req.body;
        
        // Validate input
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'No valid IDs provided' });
        }

        // Perform batch delete
        const result = await User.deleteMany({ _id: { $in: ids } });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No users found to delete' });
        }

        res.json({ 
            message: `Successfully deleted ${result.deletedCount} users`,
            deletedCount: result.deletedCount 
        });
    } catch (error) {
        console.error('Batch delete error:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};