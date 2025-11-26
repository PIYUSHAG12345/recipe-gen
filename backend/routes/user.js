// backend/routes/user.js
const express = require('express');
const router = express.Router();
const { authRequired } = require('../middleware/auth');

router.get('/me', authRequired, async (req, res) => {
  try {
    await req.user.populate('favorites', 'title cookTime avgRating');
    res.json({
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      favorites: req.user.favorites,
      ratings: req.user.ratings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
