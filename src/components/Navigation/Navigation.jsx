import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { NonAuthRoute } from "../NonAuthRoute";
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
      <Route path="/playlist/:id" element={<Playlist />} />
      <Route path="/savedvideos" element={<SaveVideos />} />
      <ProtectedRoute path="/likedVideos" element={<LikeVideos />} />
      <NonAuthRoute path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
