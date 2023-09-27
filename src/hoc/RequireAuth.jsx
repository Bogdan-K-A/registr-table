import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(({ data }) => data.isLoggedIn);
  console.log("isLoggedIn: ", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
