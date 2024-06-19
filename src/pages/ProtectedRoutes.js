import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoutes({ setUser }) {
  const userLocalStorage = window.localStorage.getItem("user");
  // axios.get("http://localhost:3000/user").then((res) => {
  //   console.log(res.data);
  // }); aucune raison d'etre ici juste pour exemple
  useEffect(() => {
    setUser(JSON.parse(userLocalStorage));
  }, []);
  return userLocalStorage ? <Outlet /> : <Navigate to="/login" />;
}
