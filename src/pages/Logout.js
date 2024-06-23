import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/login"), 1000);
  }, []); 
  window.localStorage.clear();
  setUser(null);
  return <div className="content">Logout...</div>;
}

export default Logout;
