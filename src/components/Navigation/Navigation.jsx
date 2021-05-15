import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { NonAuthRoute } from "../NonAuthRoute";
import { Home } from "../../Pages/Home";
import { LikeVideos } from "../../Pages/LikeVideos";
import { VideoWatch } from "../../Pages/VideoWatch";
import { Playlist } from "../../Pages/Playlist";
import { SaveVideos } from "../../Pages/SaveVideos";
import { PageNotFound } from "../../Pages/PageNotFound";
import { Login } from "../../Pages/Login";
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
