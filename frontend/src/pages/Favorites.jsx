// frontend/src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get("/api/recipes/favorites/list");
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error(err);
        const status = err.response?.status;
        if (status === 401) toast.error("Please login again");
        else toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Your favorite recipes</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((r) => (
          <Link
            key={r._id}
            to={`/recipe/${r._id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="h-40 bg-gray-200">
              {r.imageUrl ? (
                <img src={r.imageUrl} alt={r.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>
            <div className="p-3 space-y-1 text-sm">
              <div className="font-semibold">{r.title}</div>
              <div className="text-xs text-gray-500">
                {r.cuisine} · {r.cookTime} min · {r.difficulty}
              </div>
              <div className="text-xs text-yellow-600">
                ★ {(r.avgRating || 0).toFixed(1)} ({r.ratingCount || 0})
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!favorites.length && (
        <p className="text-sm text-gray-500 mt-3">
          You don't have any favorites yet. Save some recipes to see them here.
        </p>
      )}
    </div>
  );
}
