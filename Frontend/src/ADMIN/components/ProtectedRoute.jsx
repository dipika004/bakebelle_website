import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authData = JSON.parse(sessionStorage.getItem("isAdmin"));
  const now = new Date().getTime();

  // Check if auth data exists and is still valid
  if (!authData || now > authData.expiry) {
    sessionStorage.removeItem("isAdmin");
    return <Navigate to="/dipika-2004/login" />;
  }

  return children;
};

export default ProtectedRoute;
