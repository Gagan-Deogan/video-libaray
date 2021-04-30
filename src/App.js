import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./pages/Home";
import { LikeVideos } from "./pages/LikeVideos";
import { VideoWatch } from "./pages/VideoWatch";
import { Playlist } from "./pages/Playlist";
import { SaveVideos } from "./pages/SaveVideos";
import { Login } from "./pages/Login";
import { useAuthContext } from "./Context/AuthContext/";
const ProtectedRoute = ({ path, ...props }) => {
  const { user } = useAuthContext();
  return user ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
function App() {
  const [isNavbarOpen, setNavbarToggle] = useState();
  return (
    <div
      className={` dis-grid body-layout  ${
        isNavbarOpen ? "aside-expand " : "aside-shrink"
      } `}>
      <Navbar isNavbarOpen={isNavbarOpen} setNavbarToggle={setNavbarToggle} />
      <main className="column padding-16 w12">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/watch/:id" element={<VideoWatch />}></Route>
          <Route path="/playlist/:id" element={<Playlist />}></Route>
          <ProtectedRoute path="/savedvideos" element={<SaveVideos />} />
          <Route path="/likedVideos" element={<LikeVideos />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
