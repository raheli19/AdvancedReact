import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const homeContainerStyle = {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    minHeight: "100vh",
  };

  const headerStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  const titleStyle = {
    margin: "0",
  };

  const subcontainerStyle = {
    display: "flex",
    marginTop: "20px",
  };

  const navbarStyle = {
    flex: "1",
    backgroundColor: "#333",
    borderRadius: "5px",
    padding: "10px",
  };

  const navbarListStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  const navbarItemStyle = {
    marginBottom: "10px",
  };

  const navbarOptionStyle = {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    display: "block",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    transition: "background-color 0.3s",
  };

  const navbarOptionActiveStyle = {
    backgroundColor: "#45a049",
  };

  const outletStyle = {
    flex: "3",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    marginLeft: "20px",
  };

  return (
    <div style={homeContainerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Welcome {user?.name} !</h1>
      </div>
      <div style={subcontainerStyle}>
        <nav style={navbarStyle}>
          <ul style={navbarListStyle}>
            <li style={navbarItemStyle}>
              <NavLink
                to="/Info"
                style={navbarOptionStyle}
                activeStyle={navbarOptionActiveStyle}
              >
                Info
              </NavLink>
            </li>
            <li style={navbarItemStyle}>
              <NavLink
                to="/Todos"
                style={navbarOptionStyle}
                activeStyle={navbarOptionActiveStyle}
              >
                Todos
              </NavLink>
            </li>
            <li style={navbarItemStyle}>
              <NavLink
                to="/Posts"
                style={navbarOptionStyle}
                activeStyle={navbarOptionActiveStyle}
              >
                Posts
              </NavLink>
            </li>
            <li style={navbarItemStyle}>
              <NavLink
                to="/Albums"
                style={navbarOptionStyle}
                activeStyle={navbarOptionActiveStyle}
              >
                Albums
              </NavLink>
            </li>
            <li style={navbarItemStyle}>
              <NavLink
                to="/Logout"
                style={navbarOptionStyle}
                activeStyle={navbarOptionActiveStyle}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
        <div style={outletStyle}>
          <Outlet user={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
