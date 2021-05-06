import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSnakbarContext } from "./Context/SnakbarContext";
import { Navbar } from "./Components/Navbar";
import { Snakbar } from "./Components/Snakbar";
import { Home } from "./Pages/Home";
import { LikeVideos } from "./Pages/LikeVideos";
import { VideoWatch } from "./Pages/VideoWatch";
import { Playlist } from "./Pages/Playlist";
import { SaveVideos } from "./Pages/SaveVideos";
import { PageNotFound } from "./Pages/PageNotFound";
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
