import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ setUser }) {
  const navigate = useNavigate();
  const userLocalStorage = window.localStorage.getItem("user");
  if(userLocalStorage){
    navigate("/home");
  }
  useEffect(() => {
    setUser(JSON.parse(userLocalStorage));
  }, []);
  return userLocalStorage ? <Outlet /> : <Navigate to="/login" />;
}
