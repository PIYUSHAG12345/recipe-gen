// backend/scripts/seedUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecipes';

async function run(){
await mongoose.connect(process.env.MONGO_URI);

  const email = 'test@demo.com';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Test user already exists:', email);
    process.exit(0);
  }
  const password = 'Password123';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({ name: 'Demo User', email, passwordHash });
  await user.save();
  console.log('Created test user', email, 'password:', password);
  process.exit(0);
}
run().catch(e=>{console.error(e); process.exit(1)});
