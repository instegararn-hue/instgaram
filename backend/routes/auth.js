const express        = require('express');
const router         = express.Router();
const { login, signup } = require('../controllers/authController');

// POST /api/auth/login  → saves login attempt to MongoDB
router.post('/login',  login);

// POST /api/auth/signup → saves new user to MongoDB
router.post('/signup', signup);

module.exports = router;
