import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Info from "./pages/Info";
// import Albums from "./pages/Albums";
// import Posts from "./pages/Posts";
// import Logout from "./pages/Logout";
// import Todos from "./pages/Todos";
import ProtectedRoutes from "./pages/ProtectedRoutes";
// import Photos from "./pages/Photos";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes setUser={setUser} />}>
            <Route path="/home" element={<div>Logged</div>} />
            {/* <Route path="/home" element={<Home user={user} />} />
          <Route path="/Info" element={<Info user={user} />} />
          <Route path="/Todos" element={<Todos user={user} />} />
          <Route path="/Posts" element={<Posts user={user} />} />
          <Route path="/Posts/:postId" element={<Posts user={user} />} />
          <Route path="/Albums" element={<Albums user={user} />} />
          <Route path="/Albums/:albumId" element={<Photos user={user} />} />
          <Route path="/Logout" element={<Logout setUser={setUser} />} /> */}
          </Route>
          <Route path="/login" element={<div>Not Logged</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
