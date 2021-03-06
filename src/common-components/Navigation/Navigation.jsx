import { Routes, Route } from "react-router-dom";
import { BetterRoute } from "common-components/BetterRoute";
import { Signup } from "pages/Signup";
import { Home } from "pages/Home";
import { VideoWatch } from "pages/VideoWatch";
import { Playlist } from "pages/Playlist";
import { PageNotFound } from "pages/PageNotFound";
import { Login } from "pages/Login";
export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <BetterRoute
        type="PROTECTED"
        path="/watch/:videoId"
        element={<VideoWatch />}
      />
      <BetterRoute
        type="PROTECTED"
        path="/playlist/:playlistName"
        element={<Playlist />}
      />
      <BetterRoute type="PUBLIC-ONLY" path="/login" element={<Login />} />
      <BetterRoute type="PUBLIC-ONLY" path="/signup" element={<Signup />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
