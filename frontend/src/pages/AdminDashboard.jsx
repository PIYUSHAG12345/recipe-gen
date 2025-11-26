// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const emptyRecipe = {
  title: "",
  description: "",
  imageUrl: "",
  cuisine: "",
  difficulty: "easy",
  cookTime: 30,
  servings: 2,
  dietaryTags: [],
  ingredientsText: "",
  stepsText: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
};

export default function AdminDashboard() {
  const [form, setForm] = useState(emptyRecipe);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const toggleTag = (tag) => {
    setForm((prev) => {
      const has = prev.dietaryTags.includes(tag);
      return {
        ...prev,
        dietaryTags: has
          ? prev.dietaryTags.filter((t) => t !== tag)
          : [...prev.dietaryTags, tag],
      };
    });
  };

  const loadRecipes = async () => {
    setListLoading(true);
    try {
      const res = await API.get("/api/admin/recipes");
      setList(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin recipe list");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ingredients = form.ingredientsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => ({ name: line }));

      const steps = form.stepsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        cuisine: form.cuisine,
        difficulty: form.difficulty,
        cookTime: Number(form.cookTime) || 0,
        servings: Number(form.servings) || 1,
        dietaryTags: form.dietaryTags,
        ingredients,
        steps,
        nutrition: {
          calories: Number(form.calories) || 0,
          protein: Number(form.protein) || 0,
          carbs: Number(form.carbs) || 0,
          fat: Number(form.fat) || 0,
        },
      };

      const res = await API.post("/api/admin/recipes", payload);
      toast.success("Recipe created");
      setForm(emptyRecipe);
      loadRecipes();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to create recipe";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-2">
      <div>
        <h1 className="text-xl font-semibold mb-3">Admin · Add recipe</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-5 space-y-4 text-sm"
        >
          <div>
            <label className="font-medium text-gray-700">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={2}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-gray-700">Cuisine</label>
              <input
                value={form.cuisine}
                onChange={(e) => setForm((f) => ({ ...f, cuisine: e.target.value }))}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-gray-700">Cook time (min)</label>
              <input
                type="number"
                value={form.cookTime}
                onChange={(e) => setForm((f) => ({ ...f, cookTime: e.target.value }))}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Servings</label>
              <input
                type="number"
                value={form.servings}
                onChange={(e) => setForm((f) => ({ ...f, servings: e.target.value }))}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1">Dietary tags</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {["vegetarian", "vegan", "gluten-free", "non-veg"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full border ${
                    form.dietaryTags.includes(tag)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Ingredients (one per line)
            </label>
            <textarea
              value={form.ingredientsText}
              onChange={(e) =>
                setForm((f) => ({ ...f, ingredientsText: e.target.value }))
              }
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={4}
              placeholder="2 tomatoes&#10;1 onion&#10;100g cheese"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Steps (one per line)</label>
            <textarea
              value={form.stepsText}
              onChange={(e) =>
                setForm((f) => ({ ...f, stepsText: e.target.value }))
              }
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="font-medium text-gray-700 text-xs">Calories</label>
              <input
                type="number"
                value={form.calories}
                onChange={(e) =>
                  setForm((f) => ({ ...f, calories: e.target.value }))
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 text-xs">Protein</label>
              <input
                type="number"
                value={form.protein}
                onChange={(e) =>
                  setForm((f) => ({ ...f, protein: e.target.value }))
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 text-xs">Carbs</label>
              <input
                type="number"
                value={form.carbs}
                onChange={(e) =>
                  setForm((f) => ({ ...f, carbs: e.target.value }))
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 text-xs">Fat</label>
              <input
                type="number"
                value={form.fat}
                onChange={(e) => setForm((f) => ({ ...f, fat: e.target.value }))}
                className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Saving..." : "Create recipe"}
          </button>
          {loading && <Spinner />}
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Existing recipes</h2>
        {listLoading && <Spinner />}
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {list.map((r) => (
            <div key={r._id} className="bg-white rounded-xl shadow-sm p-3 text-sm flex gap-3">
              <div className="h-16 w-16 bg-gray-200 flex-shrink-0">
                {r.imageUrl ? (
                  <img src={r.imageUrl} alt={r.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs text-gray-500">
                  {r.cuisine} · {r.cookTime} min · {r.difficulty}
                </div>
                <div className="text-xs text-yellow-600">
                  ★ {(r.avgRating || 0).toFixed(1)} ({r.ratingCount || 0})
                </div>
              </div>
            </div>
          ))}
          {!listLoading && !list.length && (
            <p className="text-sm text-gray-500">No recipes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
