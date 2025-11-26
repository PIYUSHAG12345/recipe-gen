// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function createToken(user) {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' } // token expiry
  );
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dietaryPreferences = [] } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, password required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      dietaryPreferences
    });

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dietaryPreferences: user.dietaryPreferences,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Register error:', err.message || err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid email or password' });

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dietaryPreferences: user.dietaryPreferences,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Login error:', err.message || err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
