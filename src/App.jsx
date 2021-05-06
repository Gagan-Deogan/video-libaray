import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSnakbarContext } from "./Context/SnakbarContext";
import { Navbar } from "./Components/Navbar";
import { Snakbar } from "./Components/Snakbar";
import { Home } from "./pages/Home";
import { LikeVideos } from "./pages/LikeVideos";
import { VideoWatch } from "./pages/VideoWatch";
import { Playlist } from "./pages/Playlist";
import { SaveVideos } from "./pages/SaveVideos";
import { PageNotFound } from "./pages/PageNotFound";
function App() {
  const [isNavbarOpen, setNavbarToggle] = useState();
  const { snakbarStatus } = useSnakbarContext();
  return (
    <div
      className={` dis-grid body-layout  ${
        isNavbarOpen ? "aside-expand " : "aside-shrink"
      } `}>
      <Navbar isNavbarOpen={isNavbarOpen} setNavbarToggle={setNavbarToggle} />
      <main className="column padding-16 w12">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/watch/:videoId" element={<VideoWatch />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/savedvideos" element={<SaveVideos />} />
          <Route path="/likedVideos" element={<LikeVideos />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </div>
  );
}

export default App;