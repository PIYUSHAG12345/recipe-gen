// frontend/src/pages/Home.jsx
import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Home() {
  const [ingredientsText, setIngredientsText] = useState("");
  const [dietary, setDietary] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [maxCookTime, setMaxCookTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSearch = async () => {
    const ingredients = ingredientsText
      .split(",")
      .map((i) => i.trim().toLowerCase())
      .filter(Boolean);

    setLoading(true);
    try {
      const res = await API.post("/api/recipes/search", {
        ingredients,
        dietaryFilter: dietary || undefined,
        maxCookTime: maxCookTime ? Number(maxCookTime) : undefined,
        difficulty: difficulty || undefined,
      });
      setRecipes(res.data.results || []);
      if (!res.data.results?.length) {
        toast.info("No recipes found for this combination");
      }
    } catch (err) {
      console.error(err);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await API.post("/api/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const list = res.data.ingredients || [];
      if (list.length) {
        const merged = Array.from(
          new Set([...ingredientsText.split(",").map((x) => x.trim()).filter(Boolean), ...list])
        );
        setIngredientsText(merged.join(", "));
        toast.success("Ingredients detected from image");
      } else {
        toast.info("Could not detect clear ingredients");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image analysis failed");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Hero section */}
      <section className="bg-white rounded-2xl shadow-sm p-6 md:flex md:items-center md:justify-between gap-6">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900">
            Turn your ingredients into smart recipes 🍲
          </h1>
          <p className="mt-3 text-gray-600">
            Enter what you have, or upload a photo. Filter by diet, difficulty and cook time,
            then save and rate your favorite dishes.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="px-3 py-1 bg-blue-50 rounded-full">AI ingredient detection</span>
            <span className="px-3 py-1 bg-green-50 rounded-full">Diet filters</span>
            <span className="px-3 py-1 bg-orange-50 rounded-full">Smart suggestions</span>
          </div>
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload dish / ingredients photo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm"
            />
            {uploading && <Spinner />}
            <p className="mt-2 text-xs text-gray-500">
              Gemini Vision will detect ingredients and add them below.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & input */}
      <section className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              Ingredients (comma separated)
            </label>
            <input
              type="text"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="tomato, onion, cheese..."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Dietary
            </label>
            <select
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="non-veg">Non-veg</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Max cook time (min)
            </label>
            <input
              type="number"
              value={maxCookTime}
              onChange={(e) => setMaxCookTime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search recipes"}
          </button>
        </div>
      </section>

      {/* Results carousel-ish grid */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Results
        </h2>
        {loading && <Spinner />}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((r) => (
            <Link
              key={r._id}
              to={`/recipe/${r._id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="h-40 w-full bg-gray-200 overflow-hidden">
                {r.imageUrl ? (
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {r.title}
                  </h3>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {r.score ? r.score.toFixed(2) : "—"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {r.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                  <span>{r.cuisine || "General"}</span>
                  <span>{r.cookTime} min · {r.difficulty}</span>
                </div>
                <div className="text-xs text-yellow-600">
                  ★ {(r.avgRating || 0).toFixed(1)} ({r.ratingCount || 0})
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!loading && !recipes.length && (
          <p className="text-sm text-gray-500 mt-2">No recipes yet. Try searching with different ingredients.</p>
        )}
      </section>
    </div>
  );
}
