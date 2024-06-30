import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("first");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");

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
        phone,
        website,
        company: {
          name: companyName,
          catchPhrase,
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

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          {step === "first" ? (
            <div className="common-form form-one">
              <input
                className="register-input"
                type="text"
                placeholder="Enter UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="off"
              />
              <input
                className="register-input"
                required
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <input
                className="register-input"
                required
                type="password"
                id="verify-password"
                placeholder="Verify password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          ) : (
            <div className="common-form form-two">
              <h4>Details</h4>

              <input
                className="register-input"
                type="text"
                placeholder = "Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <input
                className="register-input"
                type="email"
                placeholder = "Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="text"
                placeholder = "Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="text"
                placeholder = "Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="text"
                placeholder = "Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                autoComplete="off"
              />

              <input
                className="register-input"
                type="text"
                placeholder = "catchPhrase"
                value={catchPhrase}
                onChange={(e) => setCatchPhrase(e.target.value)}
                autoComplete="off"
              />

            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="register-button"
            onClick={step === "second" ? handleRegister : null}
          >
            {step === "first" ? "Continue" : "Register"}
          </button>

          {step === "second" ? (
            <button
              className="register-button"
              onClick={() => setStep("first")}
            >
              Return
            </button>
          ) : null}
          {step === "first" ? (
            <button
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
