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

    const handleRegister = async () => {
      const newUser = {
        id: Date.now().toString(),
        name,
        username: userName,
        email,
        address: {
          street,
          suite,
          city,
          zipcode,
          geo: {
            lat,
            lng,
          },
        },
        phone,
        website,
        company: {
          name: companyName,
          catchPhrase,
          bs,
        },
      };

      let response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setUser(newUser);
        window.localStorage.setItem("user", JSON.stringify(newUser));
        navigate("/home");
      } else {
        setError("An error occurred while registering. Please try again.");
      }
    };

const commonFormStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
};

const formStyle = {
  ...commonFormStyle,
  maxWidth: "400px",
};

const formStyleTwo = {
  ...commonFormStyle,
  marginTop: "20px",
  padding: "20px",
  overflowY: "auto",
  maxHeight: "calc(100vh - 60px)", // Adjust based on desired padding/margin
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

const buttonLogInStyle = {
  ...buttonStyle,
  backgroundColor: "#008CBA",
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
  maxHeight: "100%", 
};

return (
  <div style={pageStyle}>
    <div style={containerStyle} className="login-container">
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
          <div style={formStyleTwo}>
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
        <button
          style={buttonStyle}
          type="submit"
          className="login-button"
          onClick={step === "second" ? handleRegister : null}
        >
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
            style={buttonLogInStyle}
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : null}
      </form>
    </div>
  </div>
);
}

export default Register;
