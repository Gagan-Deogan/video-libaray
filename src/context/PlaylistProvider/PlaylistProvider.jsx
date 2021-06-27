import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../AuthProvider";
import { reducer, initialPlaylist } from "./reducer";
import { getUserPlaylist } from "./playlistProvider.services";
import { getPlaylistIdByName } from "utils";
import { Loader } from "common-components/Loader";
const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, playlistDispatch] = useReducer(reducer, initialPlaylist);
  const [showLoader, setShowLoader] = useState(true);
  const { user, token } = useAuth();

  const savedVideosPlaylistId = getPlaylistIdByName(playlists, "Saved Videos");
  const likeVideosPlaylistId = getPlaylistIdByName(playlists, "Liked Videos");
  const notesVidoesPlaylistId = getPlaylistIdByName(playlists, "My Notes");

  useEffect(() => {
    if (user && token) {
      (async () => {
        setShowLoader(true);
        const res = await getUserPlaylist();
        if ("data" in res) {
          playlistDispatch({
            type: "LOAD_USER_PLAYLIST",
            payload: res.data,
          });
          setShowLoader(false);
        }
      })();
    }
  }, [user, token]);
  if (showLoader) {
    return <Loader />;
  }
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        savedVideosPlaylistId,
        likeVideosPlaylistId,
        notesVidoesPlaylistId,
        playlistDispatch,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
export const usePlaylist = () => {
  return useContext(PlaylistContext);
};
