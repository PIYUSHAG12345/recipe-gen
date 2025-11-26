# 🍲 Smart Recipe Generator (MERN + AI)

A full-stack **Smart Recipe Generator** built using the MERN stack with AI-powered ingredient detection from images, intelligent recipe search & filtering, dietary support, ratings, favorites, and a personalized recommendation system.

This project helps users find recipes based on the ingredients they already have, dietary preferences, cooking time, and difficulty level — with the bonus of uploading an image of food to detect ingredients using Gemini Vision.

---

## 🚀 Features

### ✅ User Features
- Login & Register with JWT authentication
- Upload food image → AI extracts ingredients
- Search recipes by:
  - Ingredients
  - Dietary preference (vegetarian, vegan, gluten-free, non-veg)
  - Cooking time
  - Difficulty level
- Smart recipe matching & scoring algorithm
- Rate recipes and view average rating
- Add/remove favorite recipes
- Personalized recipe suggestions based on:
  - Ratings
  - Favorites
  - Dietary preferences
- Adjust serving sizes dynamically
- Nutrition information per recipe (calories, protein, carbs, fat)

---

### 🎨 UI/UX
- Mobile responsive design
- Professional UI using Tailwind CSS
- Toast notifications & loading spinners
- Protected routes for user/admin
- Clean layout with header, footer, filters & cards

---

## 🧠 AI Features

Using **Gemini Vision API** to:
- Analyze food images
- Detect dish and ingredient names
- Return top probable ingredients
- Insert into recipe search automatically

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Toastify

### Backend
- Node.js
- Express
- MongoDB Atlas
- JWT Authentication
- Multer (image upload)
- Gemini Vision API

---

