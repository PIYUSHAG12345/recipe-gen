// frontend/src/pages/RecipePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getToken } from "../utils/auth";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // simple local flag

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/recipes/${id}`);
        setRecipe(res.data);
        setServings(res.data.servings || 1);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const scaleIngredient = (ing) => {
    if (!ing.quantity || !recipe?.servings) return ing;
    const factor = servings / (recipe.servings || 1);
    return {
      ...ing,
      quantity: Math.round(ing.quantity * factor * 100) / 100,
    };
  };

  const handleRate = async (value) => {
    if (!getToken()) {
      toast.error("Login to rate recipes");
      return;
    }
    setRatingLoading(true);
    try {
      const res = await API.post(`/api/recipes/${id}/rate`, { rating: value });
      setRecipe((prev) =>
        prev
          ? {
              ...prev,
              avgRating: res.data.avgRating,
              ratingCount: res.data.ratingCount,
            }
          : prev
      );
      toast.success("Thanks for rating!");
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      if (status === 401) toast.error("Please login again");
      else toast.error("Failed to rate recipe");
    } finally {
      setRatingLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!getToken()) {
      toast.error("Login to save favorites");
      return;
    }
    setFavLoading(true);
    try {
      const res = await API.post(`/api/recipes/${id}/favorite`, {
        favorite: !isFavorite,
      });
      setIsFavorite(!isFavorite);
      toast.success(!isFavorite ? "Added to favorites" : "Removed from favorites");
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      if (status === 401) toast.error("Please login again");
      else toast.error("Failed to update favorites");
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!recipe) return <div className="max-w-4xl mx-auto px-4 py-6">Recipe not found</div>;

  const scaledIngredients = (recipe.ingredients || []).map(scaleIngredient);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Link to="/" className="text-sm text-blue-600">
        ← Back to search
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden md:flex">
        <div className="md:w-1/2 h-64 md:h-auto bg-gray-200">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-5 space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">{recipe.title}</h1>
          <p className="text-sm text-gray-600">{recipe.description}</p>
          <div className="text-xs text-gray-500 flex flex-wrap gap-3">
            <span>{recipe.cuisine || "General"}</span>
            <span>{recipe.cookTime} min</span>
            <span>{recipe.difficulty}</span>
            <span>
              Diet: {recipe.dietaryTags?.length ? recipe.dietaryTags.join(", ") : "—"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-yellow-600 font-semibold">
              ★ {(recipe.avgRating || 0).toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              ({recipe.ratingCount || 0} ratings)
            </span>
          </div>
          <div className="flex gap-2 text-sm mt-2">
            <button
              onClick={toggleFavorite}
              disabled={favLoading}
              className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {isFavorite ? "★ Favorited" : "☆ Save to favorites"}
            </button>
            <div className="flex items-center gap-1 text-sm">
              Rate:
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  disabled={ratingLoading}
                  onClick={() => handleRate(n)}
                  className="text-lg"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-4 mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
          <div className="flex items-center gap-2 text-sm">
            <span>Servings:</span>
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
        </div>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-800">
          {scaledIngredients.map((ing, idx) => (
            <li key={idx}>
              {ing.quantity ? `${ing.quantity} ${ing.unit || ""} ` : ""}
              {ing.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Steps</h2>
        <ol className="list-decimal ml-5 space-y-2 text-sm text-gray-800">
          {(recipe.steps || []).map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Nutrition (per serving)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-800">
          <div>
            <div className="text-xs text-gray-500">Calories</div>
            <div>{recipe.nutrition?.calories || 0} kcal</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Protein</div>
            <div>{recipe.nutrition?.protein || 0} g</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Carbs</div>
            <div>{recipe.nutrition?.carbs || 0} g</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Fat</div>
            <div>{recipe.nutrition?.fat || 0} g</div>
          </div>
        </div>
      </section>
    </div>
  );
}
