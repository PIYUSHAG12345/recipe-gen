// frontend/src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const token = getToken();
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!token || !user) {
    toast.error("Please login to access this page");
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    toast.error("Admin access only");
    return <Navigate to="/" replace />;
  }

  return children;
}
