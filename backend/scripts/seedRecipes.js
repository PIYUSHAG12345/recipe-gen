// backend/scripts/seedRecipes.js
require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const seed = require('../seed/recipesSeed');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecipes';

async function seedDB() {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to Mongo — seeding...');

    await Recipe.deleteMany({});
    await Recipe.insertMany(seed);

    console.log('Seeding complete — inserted', seed.length, 'recipes');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seedDB();
