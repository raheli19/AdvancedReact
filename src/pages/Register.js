import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("first");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch("http://localhost:3000/user");
    let json = await response.json();

    const result = json.find((user) => user.username === userName);
    if (!result && password === verifyPassword) {
      setStep("second");
    } else if (result) {
      setError("Your Username already exists! Please Login!");
    } else {
      setError("Your Passwords do not match!");
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    fontSize: "16px",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50", // Green background
    color: "white", // White text
    padding: "15px 20px", // Padding
    textAlign: "center", // Centered text
    textDecoration: "none", // Remove underline
    display: "inline-block", // Inline-block element
    fontSize: "16px", // Font size
    margin: "10px 2px", // Margin
    cursor: "pointer", // Pointer cursor on hover
    border: "none", // Remove border
    borderRadius: "8px", // Rounded corners
    transition: "background-color 0.3s", // Smooth transition for background color
  };

  return (
    <div>
      <div className="login-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          {step === "first" ? (
            <div style={formStyle}>
              <label style={labelStyle}>User Name</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Enter UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label style={labelStyle}>Password</label>
              <input
                style={inputStyle}
                required
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label style={labelStyle}>Verify Password</label>
              <input
                required
                style={inputStyle}
                type="password"
                id="verify-password"
                placeholder="Verify password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
            </div>
          ) : (
            <div style={formStyle}>
              <label style={labelStyle}>Name</label>
              <input
                style={inputStyle}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label style={labelStyle}>Email</label>
              <input
                style={inputStyle}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label style={labelStyle}>Street</label>
              <input
                style={inputStyle}
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              <label style={labelStyle}>Suite</label>
              <input
                style={inputStyle}
                type="text"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
              />

              <label style={labelStyle}>City</label>
              <input
                style={inputStyle}
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label style={labelStyle}>Zipcode</label>
              <input
                style={inputStyle}
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />

              <label style={labelStyle}>Latitude</label>
              <input
                style={inputStyle}
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />

              <label style={labelStyle}>Longitude</label>
              <input
                style={inputStyle}
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />

              <label style={labelStyle}>Phone</label>
              <input
                style={inputStyle}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label style={labelStyle}>Website</label>
              <input
                style={inputStyle}
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              <label style={labelStyle}>Company Name</label>
              <input
                style={inputStyle}
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <label style={labelStyle}>Catch Phrase</label>
              <input
                style={inputStyle}
                type="text"
                value={catchPhrase}
                onChange={(e) => setCatchPhrase(e.target.value)}
              />

              <label style={labelStyle}>BS</label>
              <input
                style={inputStyle}
                type="text"
                value={bs}
                onChange={(e) => setBs(e.target.value)}
              />
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          <button style={buttonStyle} type="submit" className="login-button">
            {step === "first" ? "Continue" : "Register"}
          </button>

          {step === "second" ? (
            <button
              style={buttonStyle}
              className="login-button"
              onClick={() => setStep("first")}
            >
              Return
            </button>
          ) : null}
          {step === "first" ? (
            <button
              style={buttonStyle}
              className="login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ): null}
        </form>
      </div>
    </div>
  );
}

export default Register;
