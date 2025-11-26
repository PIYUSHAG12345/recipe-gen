// backend/routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { authRequired } = require('../middleware/auth');

// Helper: scoring function for recipe search
function scoreRecipe(recipe, queryIngredients, maxCookTime, difficultyFilter) {
  const recIngs = (recipe.ingredients || []).map(i => i.name.toLowerCase());
  const uniqueRecIngs = Array.from(new Set(recIngs));
  const uniqueQuery = Array.from(new Set(queryIngredients.map(i => i.toLowerCase())));

  const matches = uniqueQuery.filter(q => uniqueRecIngs.includes(q));
  const matchRatio = matches.length / Math.max(uniqueRecIngs.length, 1);

  const ratingBoost = (recipe.avgRating || 0) / 5; // 0..1
  let timeBoost = 1;
  if (maxCookTime && recipe.cookTime) {
    const ratio = recipe.cookTime / maxCookTime;
    timeBoost = ratio <= 1 ? 1 : 1 / ratio;
  }

  let difficultyBonus = 0;
  if (difficultyFilter) {
    difficultyBonus = recipe.difficulty === difficultyFilter ? 0.1 : 0;
  }

  const score = matchRatio * 0.6 + ratingBoost * 0.3 + timeBoost * 0.1 + difficultyBonus;
  return { score, matches };
}

// Search with filters
router.post('/search', async (req, res) => {
  try {
    const {
      ingredients = [],
      dietaryFilter,   // e.g. 'vegetarian', 'gluten-free', 'non-veg'
      maxCookTime,     // number (minutes)
      difficulty,      // 'easy' | 'medium' | 'hard'
      page = 1,
      limit = 20
    } = req.body;

    const query = {};
    if (dietaryFilter) {
      query.dietaryTags = dietaryFilter;
    }
    if (maxCookTime) {
      query.cookTime = { $lte: maxCookTime };
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // If we have ingredients, pre-filter by any ingredient appearing
    let searchBase = Recipe.find(query);
    if (ingredients && ingredients.length) {
      const lowerIngs = ingredients.map(i => i.toLowerCase());
      searchBase = searchBase.where('ingredients.name').in(lowerIngs);
    }

    const recipes = await searchBase.lean();
    const scored = recipes.map(r => {
      const { score, matches } = scoreRecipe(r, ingredients, maxCookTime, difficulty);
      return { ...r, score, matchedIngredients: matches };
    });

    scored.sort((a, b) => b.score - a.score);

    const start = (page - 1) * limit;
    const paged = scored.slice(start, start + limit);

    res.json({
      total: scored.length,
      page,
      limit,
      results: paged
    });
  } catch (err) {
    console.error('Search error:', err.message || err);
    res.status(500).json({ error: 'Recipe search failed' });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    console.error('Get recipe error:', err.message || err);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Rate a recipe
router.post('/:id/rate', authRequired, async (req, res) => {
  try {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be 1-5' });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    const user = req.user;
    const existing = user.ratings.find(r => r.recipe.toString() === recipe._id.toString());

    if (existing) {
      // update old rating
      const oldRating = existing.rating;
      existing.rating = rating;
      // adjust avg
      recipe.avgRating = (recipe.avgRating * recipe.ratingCount - oldRating + rating) / recipe.ratingCount;
    } else {
      user.ratings.push({ recipe: recipe._id, rating });
      recipe.ratingCount += 1;
      recipe.avgRating = (recipe.avgRating * (recipe.ratingCount - 1) + rating) / recipe.ratingCount;
    }

    await user.save();
    await recipe.save();

    res.json({ success: true, avgRating: recipe.avgRating, ratingCount: recipe.ratingCount });
  } catch (err) {
    console.error('Rate recipe error:', err.message || err);
    res.status(500).json({ error: 'Failed to rate recipe' });
  }
});

// Favorite / unfavorite
router.post('/:id/favorite', authRequired, async (req, res) => {
  try {
    const { favorite } = req.body;
    const recipeId = req.params.id;
    const user = req.user;

    if (favorite) {
      if (!user.favorites.includes(recipeId)) {
        user.favorites.push(recipeId);
      }
    } else {
      user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
    }

    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error('Favorite error:', err.message || err);
    res.status(500).json({ error: 'Failed to update favorites' });
  }
});

// Get favorite recipes
router.get('/favorites/list', authRequired, async (req, res) => {
  try {
    await req.user.populate('favorites');
    res.json({ favorites: req.user.favorites });
  } catch (err) {
    console.error('Get favorites error:', err.message || err);
    res.status(500).json({ error: 'Failed to load favorites' });
  }
});

// Suggestions based on ratings & preferences
router.get('/suggestions/me', authRequired, async (req, res) => {
  try {
    const user = req.user;

    const ratedRecipeIds = user.ratings.map(r => r.recipe.toString());
    const favoriteIds = user.favorites.map(f => f.toString());
    const excludeIds = [...new Set([...ratedRecipeIds, ...favoriteIds])];

    // compute favorite cuisines from user ratings
    const ratedRecipes = await Recipe.find({ _id: { $in: ratedRecipeIds } }, 'cuisine').lean();
    const cuisineCount = {};
    ratedRecipes.forEach(r => {
      if (!r.cuisine) return;
      cuisineCount[r.cuisine] = (cuisineCount[r.cuisine] || 0) + 1;
    });
    const favCuisines = Object.entries(cuisineCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([c]) => c);

    const query = {
      _id: { $nin: excludeIds }
    };

    if (user.dietaryPreferences && user.dietaryPreferences.length) {
      query.dietaryTags = { $in: user.dietaryPreferences };
    }

    if (favCuisines.length) {
      query.cuisine = { $in: favCuisines };
    }

    const suggestions = await Recipe.find(query)
      .sort({ avgRating: -1, ratingCount: -1 })
      .limit(10)
      .lean();

    res.json({ suggestions });
  } catch (err) {
    console.error('Suggestions error:', err.message || err);
    res.status(500).json({ error: 'Failed to load suggestions' });
  }
});

module.exports = router;
