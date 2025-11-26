// frontend/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../utils/auth";
import { toast } from "react-toastify";

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 flex h-14 items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SmartRecipe
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          {user && (
            <>
              <Link to="/favorites" className="hover:text-blue-600">
                Favorites
              </Link>
              <Link to="/suggestions" className="hover:text-blue-600">
                Suggestions
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-blue-600">
                  Admin
                </Link>
              )}
            </>
          )}
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded bg-blue-600 text-white"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
