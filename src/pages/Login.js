import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // axios.get("http://localhost:3000/user").then((res) => {
    //   console.log(res.data);
    // }); aucune raison d'etre ici juste pour exemple

    let response = await fetch("http://localhost:3000/user");
    let json = await response.json();

    const result = json.find(
        
      (user) =>
        user.username === userName &&
        user.website === password
    );
    setUser(result);
    console.log(result);
    if (result) {
      window.localStorage.setItem("user", JSON.stringify(result));
      navigate("/home");
    } else {
      setError("Your Username or Password is wrong!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              required
              type="text"
              id="userName"
              placeholder="Enter user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          
        </form>
        <button type="submit" className="login-button" onClick={() => navigate('/register')}>
            Register
          </button>
      </div>
    </div>
  );
}

export default Login;
