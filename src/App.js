import React,{ useState } from "react"
import './css/App.css';
import { Routes , Route } from "react-router-dom"
import { Navbar } from "./components/navbar/Navbar"
import { Home } from "./pages/home/Home"
import { VideoWatch } from "./pages/video_watch/VideoWatch"
import { Playlist } from "./pages/playlist/Playlist"
import { SaveVideos } from "./pages/save_videos/SaveVideos"
import { LikeVideos } from './pages/like_videos/LikeVideos';
function App() {
  const [ isNavbarOpen, setNavbarToggle ] = useState();
  return (
    <div className={`dis-grid ${ isNavbarOpen ? "aside-open" : "aside-close" } flx-wrp`} >
      <Navbar isNavbarOpen={isNavbarOpen} setNavbarToggle={setNavbarToggle} />
      <main className="col pad-16 w12">
        <Routes>
          <Route path="/" element={ <Home/> } ></Route>
          <Route path="/watch/:id"  element={ <VideoWatch/> } ></Route>
          <Route path="/playlist/:id"  element={ <Playlist/> } ></Route>
          <Route path="/savevideos"  element={ <SaveVideos/> } ></Route>
          <Route path="/likeVideos"  element={ <LikeVideos/> } ></Route>
        </Routes>
      </main>

    </div>
  );
}

export default App;
