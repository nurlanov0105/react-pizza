import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
   const { isAuth } = useAuth();

   return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
