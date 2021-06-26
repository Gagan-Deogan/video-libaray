import { Routes, Route } from "react-router-dom";
import { BetterRoute } from "common-components/BetterRoute";
import { Signup } from "pages/Signup";
import { Home } from "pages/Home";
import { LikeVideos } from "pages/LikeVideos";
import { VideoWatch } from "pages/VideoWatch";
import { Playlist } from "pages/Playlist";
import { SaveVideos } from "pages/SaveVideos";
import { PageNotFound } from "pages/PageNotFound";
import { Login } from "pages/Login";
export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/watch/:videoId" element={<VideoWatch />} />
      <BetterRoute
        type="PROTECTED"
        path="/playlist/:id"
        element={<Playlist />}
      />
      <BetterRoute
        type="PROTECTED"
        path="/savedvideos"
        element={<SaveVideos />}
      />
      <BetterRoute
        type="PROTECTED"
        path="/likedVideos"
        element={<LikeVideos />}
      />
      <BetterRoute type="PUBLIC-ONLY" path="/login" element={<Login />} />
      <BetterRoute type="PUBLIC-ONLY" path="/signup" element={<Signup />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
