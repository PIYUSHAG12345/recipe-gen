// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import API from "../api";
import Spinner from "../components/Spinner";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dietaryPreferences: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePreference = (value) => {
    setForm((prev) => {
      const has = prev.dietaryPreferences.includes(value);
      return {
        ...prev,
        dietaryPreferences: has
          ? prev.dietaryPreferences.filter((v) => v !== value)
          : [...prev.dietaryPreferences, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/api/auth/register", form);
      saveAuth(res.data);
      toast.success("Registered & logged in");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Dietary preferences</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {["vegetarian", "vegan", "gluten-free", "non-veg"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => togglePreference(tag)}
                className={`px-3 py-1 rounded-full border ${
                  form.dietaryPreferences.includes(tag)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
        {loading && <Spinner />}
      </form>
    </div>
  );
}
