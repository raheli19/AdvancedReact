import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../css/Home.css"; // Import the new CSS file

const Home = () => {
  useEffect(() => {
    // Add the 'home' class to the body element
    document.body.classList.add('home');

    // Clean up by removing the 'home' class when the component unmounts
    return () => {
      document.body.classList.remove('home');
    };
  }, []);

  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome {user?.name}</h1>
      </div>
      <div className="subcontainer">
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/Info" activeClassName="active">
                Info
              </NavLink>
            </li>
            <li>
              <NavLink to="/Todos" activeClassName="active">
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/Posts" activeClassName="active">
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/Albums" activeClassName="active">
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink to="/Logout" activeClassName="active">
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="outlet">
          <Outlet user={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
