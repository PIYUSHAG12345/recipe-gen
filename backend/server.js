require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const recipeRoutes = require('./routes/recipes');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');




const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecipes';

/**
 * Note: Mongoose 7+ removed support for legacy options like
 * useNewUrlParser and useUnifiedTopology. Pass no options, or only supported ones.
 */
mongoose.connect(MONGO)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error:', err.message || err);
  });
