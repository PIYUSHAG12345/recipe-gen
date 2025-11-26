// backend/models/Recipe.js
const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, default: 0 },
  unit: { type: String, default: '' }
});

const NutritionSchema = new mongoose.Schema({
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 }, // g
  carbs: { type: Number, default: 0 },   // g
  fat: { type: Number, default: 0 }      // g
});

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    imageUrl: { type: String, default: '' },

    ingredients: { type: [IngredientSchema], required: true },
    steps: { type: [String], required: true },

    cuisine: { type: String, default: 'Global' },

    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy'
    },

    cookTime: { type: Number, default: 30 }, // in minutes
    servings: { type: Number, default: 2 },

    nutrition: { type: NutritionSchema, default: () => ({}) },

    // dietary tags like: 'vegetarian', 'vegan', 'gluten-free', 'non-veg'
    dietaryTags: [{ type: String }],

    // ratings
    avgRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
