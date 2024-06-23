import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch("http://localhost:3000/user");
    let json = await response.json();

    const result = json.find(
      (user) => user.username === userName && user.website === password
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

  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  };

  const containerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

 const inputStyle = {
   marginBottom: "10px",
   padding: "8px",
   fontSize: "16px",
 };


  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "background-color 0.3s",
  };

  const buttonRegisterStyle = {
    ...buttonStyle,
    backgroundColor: "#008CBA",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "15px",
  };

  return (
    <div style={pageStyle} className="login-page">
      <div style={containerStyle} className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} htmlFor="userName">
              User Name
            </label>
            <input
              style={inputStyle}
              required
              type="text"
              id="userName"
              placeholder="Enter user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              style={inputStyle}
              required
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p style={errorStyle} className="error-message">
              {error}
            </p>
          )}
          <button style={buttonStyle} type="submit" className="login-button">
            Login
          </button>
        </form>
        <button
          style={buttonRegisterStyle}
          type="submit"
          className="login-button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
