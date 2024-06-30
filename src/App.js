import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Albums from "./pages/Albums";
import Posts from "./pages/Posts";
import Logout from "./pages/Logout";
import Todos from "./pages/Todos";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Photos from "./pages/Photos";
import Register from "./pages/Register";
import NewPost from "./pages/NewPost";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes setUser={setUser} />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/Info/:userId" element={<Info user={user} />} />
            <Route path="/Todos/:userId" element={<Todos user={user} />} />
            <Route path="/Posts/:userId" element={<Posts user={user}/>} />
            <Route path="/NewPost" element={<NewPost user={user} />} />
            <Route path="/Albums/:userId" element={<Albums user={user} />} />
            <Route path="/Albums/:userId/id/:albumId" element={<Photos user={user} />} />
            <Route path="/Logout" element={<Logout setUser={setUser} />} />
          </Route>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
