// backend/models/User.js
const mongoose = require('mongoose');

const UserRatingSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  rating: { type: Number, min: 1, max: 5 }
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    isAdmin: { type: Boolean, default: false },

    // preferences for future suggestions
    dietaryPreferences: [{ type: String }], // e.g., ['vegetarian', 'gluten-free']

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],

    ratings: [UserRatingSchema] // per-recipe rating
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
