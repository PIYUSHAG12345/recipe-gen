// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { authRequired, adminRequired } = require('../middleware/auth');

// Create recipe
router.post('/recipes', authRequired, adminRequired, async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      ingredients,
      steps,
      cuisine,
      difficulty,
      cookTime,
      servings,
      nutrition,
      dietaryTags
    } = req.body;

    if (!title || !ingredients || !ingredients.length || !steps || !steps.length) {
      return res.status(400).json({ error: 'Title, ingredients and steps are required' });
    }

    const recipe = await Recipe.create({
      title,
      description,
      imageUrl,
      ingredients,
      steps,
      cuisine,
      difficulty,
      cookTime,
      servings,
      nutrition,
      dietaryTags,
      createdBy: req.user._id
    });

    res.status(201).json(recipe);
  } catch (err) {
    console.error('Admin create recipe error:', err.message || err);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// (Optional) list all recipes for admin
router.get('/recipes', authRequired, adminRequired, async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).lean();
    res.json(recipes);
  } catch (err) {
    console.error('Admin list recipes error:', err.message || err);
    res.status(500).json({ error: 'Failed to load recipes' });
  }
});

module.exports = router;
