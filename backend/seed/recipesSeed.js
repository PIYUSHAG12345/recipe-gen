// backend/seed/recipesSeed.js
module.exports = [
  {
    title: "Tomato Basil Pasta",
    cuisine: "Italian",
    ingredients: [
      { name: "pasta", quantity: 200, unit: "g" },
      { name: "tomato", quantity: 3, unit: "pcs" },
      { name: "basil", quantity: 10, unit: "leaves" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "olive oil", quantity: 2, unit: "tbsp" }
    ],
    steps: ["Boil pasta until al dente.", "Sauté garlic in olive oil, add chopped tomatoes.", "Toss pasta with sauce and fresh basil."],
    nutrition: { calories: 400, protein: 12, carbs: 60, fat: 12 },
    difficulty: "easy",
    cookTime: 20,
    servings: 2,
    dietaryTags: ["vegetarian"]
  },
  {
    title: "Vegetable Stir Fry with Tofu",
    cuisine: "Chinese",
    ingredients: [
      { name: "tofu", quantity: 200, unit: "g" },
      { name: "bell pepper", quantity: 1, unit: "pcs" },
      { name: "broccoli", quantity: 150, unit: "g" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "garlic", quantity: 2, unit: "cloves" }
    ],
    steps: ["Cube and fry tofu.", "Stir-fry veggies and add sauce.", "Combine tofu and vegetables."],
    nutrition: { calories: 350, protein: 18, carbs: 30, fat: 14 },
    difficulty: "medium",
    cookTime: 25,
    servings: 2,
    dietaryTags: ["vegan", "gluten-free"]
  },
  {
    title: "Chicken Curry",
    cuisine: "Indian",
    ingredients: [
      { name: "chicken", quantity: 500, unit: "g" },
      { name: "onion", quantity: 2, unit: "pcs" },
      { name: "tomato", quantity: 2, unit: "pcs" },
      { name: "garlic", quantity: 3, unit: "cloves" },
      { name: "curry powder", quantity: 2, unit: "tbsp" }
    ],
    steps: ["Fry onions and garlic.", "Add spices and tomato.", "Add chicken and simmer until cooked."],
    nutrition: { calories: 600, protein: 45, carbs: 10, fat: 35 },
    difficulty: "medium",
    cookTime: 40,
    servings: 4,
    dietaryTags: []
  },
  {
    title: "Masala Omelette",
    cuisine: "Indian",
    ingredients: [
      { name: "egg", quantity: 3, unit: "pcs" },
      { name: "onion", quantity: 0.5, unit: "pcs" },
      { name: "tomato", quantity: 0.5, unit: "pcs" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "pepper", quantity: 0.5, unit: "tsp" }
    ],
    steps: ["Whisk eggs with salt and pepper.", "Add chopped onion and tomato.", "Cook on pan until set."],
    nutrition: { calories: 250, protein: 18, carbs: 3, fat: 18 },
    difficulty: "easy",
    cookTime: 10,
    servings: 1,
    dietaryTags: ["gluten-free"]
  },
  {
    title: "Grilled Cheese Sandwich",
    cuisine: "American",
    ingredients: [
      { name: "bread", quantity: 2, unit: "slices" },
      { name: "cheese", quantity: 2, unit: "slices" },
      { name: "butter", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Butter bread slices.", "Add cheese between slices and grill until golden."],
    nutrition: { calories: 350, protein: 12, carbs: 30, fat: 20 },
    difficulty: "easy",
    cookTime: 8,
    servings: 1,
    dietaryTags: ["vegetarian"]
  },
  {
    title: "Pancakes",
    cuisine: "American",
    ingredients: [
      { name: "flour", quantity: 200, unit: "g" },
      { name: "milk", quantity: 300, unit: "ml" },
      { name: "egg", quantity: 1, unit: "pcs" },
      { name: "baking powder", quantity: 1, unit: "tsp" },
      { name: "sugar", quantity: 2, unit: "tbsp" }
    ],
    steps: ["Mix dry ingredients.", "Add milk and egg, whisk to batter.", "Cook on griddle until bubbles form and flip."],
    nutrition: { calories: 520, protein: 10, carbs: 80, fat: 12 },
    difficulty: "easy",
    cookTime: 20,
    servings: 3,
    dietaryTags: []
  },
  {
    title: "Greek Salad",
    cuisine: "Greek",
    ingredients: [
      { name: "cucumber", quantity: 1, unit: "pcs" },
      { name: "tomato", quantity: 2, unit: "pcs" },
      { name: "feta cheese", quantity: 100, unit: "g" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "olive", quantity: 10, unit: "pcs" }
    ],
    steps: ["Chop vegetables.", "Toss with olive oil and feta."],
    nutrition: { calories: 220, protein: 6, carbs: 10, fat: 18 },
    difficulty: "easy",
    cookTime: 10,
    servings: 2,
    dietaryTags: ["vegetarian", "gluten-free"]
  },

  {
    title: "Chickpea Salad",
    cuisine: "Mediterranean",
    ingredients: [
      { name: "chickpeas", quantity: 200, unit: "g" },
      { name: "tomato", quantity: 1, unit: "pcs" },
      { name: "cucumber", quantity: 1, unit: "pcs" },
      { name: "olive oil", quantity: 1, unit: "tbsp" },
      { name: "lemon", quantity: 0.5, unit: "pcs" }
    ],
    steps: ["Mix chickpeas and chopped veggies.", "Dress with olive oil and lemon."],
    nutrition: { calories: 300, protein: 12, carbs: 40, fat: 8 },
    difficulty: "easy",
    cookTime: 10,
    servings: 2,
    dietaryTags: ["vegan", "gluten-free"]
  },
  {
    title: "Masala Dosa (Simple)",
    cuisine: "Indian",
    ingredients: [
      { name: "rice", quantity: 200, unit: "g" },
      { name: "urad dal", quantity: 50, unit: "g" },
      { name: "potato", quantity: 2, unit: "pcs" },
      { name: "onion", quantity: 1, unit: "pcs" },
      { name: "mustard seeds", quantity: 1, unit: "tsp" }
    ],
    steps: ["Prepare dosa batter (or use store-bought).", "Make spiced mashed potato filling.", "Cook dosa and fill with masala."],
    nutrition: { calories: 450, protein: 12, carbs: 70, fat: 10 },
    difficulty: "hard",
    cookTime: 60,
    servings: 3,
    dietaryTags: ["vegetarian"]
  },
  {
    title: "Lentil Soup",
    cuisine: "Middle Eastern",
    ingredients: [
      { name: "lentils", quantity: 200, unit: "g" },
      { name: "carrot", quantity: 1, unit: "pcs" },
      { name: "onion", quantity: 1, unit: "pcs" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "cumin", quantity: 1, unit: "tsp" }
    ],
    steps: ["Sauté onion and garlic.", "Add lentils and water; simmer until soft.", "Blend slightly for creamy texture."],
    nutrition: { calories: 320, protein: 18, carbs: 50, fat: 4 },
    difficulty: "easy",
    cookTime: 35,
    servings: 3,
    dietaryTags: ["vegan", "gluten-free"]
  },
  {
    title: "Avocado Toast",
    cuisine: "American",
    ingredients: [
      { name: "bread", quantity: 2, unit: "slices" },
      { name: "avocado", quantity: 1, unit: "pcs" },
      { name: "lemon", quantity: 0.5, unit: "pcs" },
      { name: "salt", quantity: 0.5, unit: "tsp" }
    ],
    steps: ["Toast the bread.", "Mash avocado with lemon and salt; spread on toast."],
    nutrition: { calories: 350, protein: 6, carbs: 30, fat: 20 },
    difficulty: "easy",
    cookTime: 5,
    servings: 1,
    dietaryTags: ["vegan"]
  },
  {
    title: "Shrimp Fried Rice",
    cuisine: "Asian",
    ingredients: [
      { name: "rice", quantity: 250, unit: "g" },
      { name: "shrimp", quantity: 200, unit: "g" },
      { name: "egg", quantity: 1, unit: "pcs" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" }
    ],
    steps: ["Cook rice and let cool.", "Stir-fry shrimp and veggies, add rice and soy sauce.", "Push rice aside and scramble egg, then mix."],
    nutrition: { calories: 600, protein: 30, carbs: 75, fat: 12 },
    difficulty: "medium",
    cookTime: 25,
    servings: 3,
    dietaryTags: []
  },
  {
    title: "Quinoa Salad",
    cuisine: "Healthy",
    ingredients: [
      { name: "quinoa", quantity: 150, unit: "g" },
      { name: "cucumber", quantity: 1, unit: "pcs" },
      { name: "tomato", quantity: 1, unit: "pcs" },
      { name: "olive oil", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Cook quinoa and cool.", "Mix with chopped veggies and dressing."],
    nutrition: { calories: 330, protein: 10, carbs: 45, fat: 8 },
    difficulty: "easy",
    cookTime: 20,
    servings: 2,
    dietaryTags: ["vegetarian", "gluten-free"]
  },
  {
    title: "Fruit Smoothie",
    cuisine: "Beverage",
    ingredients: [
      { name: "banana", quantity: 1, unit: "pcs" },
      { name: "strawberries", quantity: 100, unit: "g" },
      { name: "milk", quantity: 200, unit: "ml" },
      { name: "honey", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Blend all ingredients until smooth."],
    nutrition: { calories: 220, protein: 6, carbs: 45, fat: 2 },
    difficulty: "easy",
    cookTime: 5,
    servings: 1,
    dietaryTags: []
  },
  {
    title: "Aloo Paratha (Simple)",
    cuisine: "Indian",
    ingredients: [
      { name: "wheat flour", quantity: 200, unit: "g" },
      { name: "potato", quantity: 2, unit: "pcs" },
      { name: "salt", quantity: 1, unit: "tsp" },
      { name: "ghee", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Make dough from flour.", "Prepare spiced potato filling.", "Roll and cook parathas on tava with ghee."],
    nutrition: { calories: 500, protein: 8, carbs: 70, fat: 18 },
    difficulty: "medium",
    cookTime: 40,
    servings: 3,
    dietaryTags: ["vegetarian"]
  },
  {
    title: "Butter Chicken",
    cuisine: "Indian",
    ingredients: [
      { name: "chicken", quantity: 500, unit: "g" },
      { name: "butter", quantity: 50, unit: "g" },
      { name: "cream", quantity: 100, unit: "ml" },
      { name: "tomato", quantity: 3, unit: "pcs" }
    ],
    steps: ["Cook chicken in spices.", "Prepare tomato-based gravy with butter and cream.", "Add chicken and simmer."],
    nutrition: { calories: 700, protein: 45, carbs: 12, fat: 45 },
    difficulty: "medium",
    cookTime: 50,
    servings: 4,
    dietaryTags: []
  },
  {
    title: "Salsa and Nachos",
    cuisine: "Mexican",
    ingredients: [
      { name: "tortilla chips", quantity: 150, unit: "g" },
      { name: "tomato", quantity: 2, unit: "pcs" },
      { name: "onion", quantity: 0.5, unit: "pcs" },
      { name: "cilantro", quantity: 5, unit: "g" }
    ],
    steps: ["Chop tomatoes and onion, mix with cilantro and salt.", "Serve with tortilla chips."],
    nutrition: { calories: 420, protein: 6, carbs: 50, fat: 22 },
    difficulty: "easy",
    cookTime: 10,
    servings: 2,
    dietaryTags: ["vegetarian"]
  },
  {
    title: "Minestrone Soup",
    cuisine: "Italian",
    ingredients: [
      { name: "carrot", quantity: 1, unit: "pcs" },
      { name: "celery", quantity: 1, unit: "stalk" },
      { name: "tomato", quantity: 2, unit: "pcs" },
      { name: "pasta", quantity: 100, unit: "g" },
      { name: "beans", quantity: 150, unit: "g" }
    ],
    steps: ["Sauté vegetables, add stock and tomatoes.", "Add pasta and beans and simmer."],
    nutrition: { calories: 360, protein: 15, carbs: 55, fat: 6 },
    difficulty: "medium",
    cookTime: 40,
    servings: 3,
    dietaryTags: ["vegetarian"]
  }
];
