import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ setUser }) {
  const navigate = useNavigate();
  const userLocalStorage = window.localStorage.getItem("user");
  
  useEffect(() => {
    setUser(JSON.parse(userLocalStorage));
  }, []);
return userLocalStorage ? (
  <div style={{height: '100vh', overflow: 'hidden'}}>
  <div style={{paddingTop: '40px', backgroundColor: '#f1dbdd', color: '#333', position: 'relative'}}>
    <button onClick={() => navigate('/home')} style={{position: 'absolute', right: '10px', top: '0px', padding: '6px 10px', backgroundColor: '#e26464', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Return Home</button>
    <div style={{overflowY: 'auto', height: 'calc(100vh - 40px)'}}>
      <Outlet />
    </div>
  </div>
</div>
  ) : <Navigate to="/login" />;
}