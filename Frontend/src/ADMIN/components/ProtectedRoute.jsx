// src/ADMIN/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdmin"); // Or use context/auth hook

  return isAuthenticated === "true" ? children : <Navigate to="/dipika-2004/login" />;
};

export default ProtectedRoute;
