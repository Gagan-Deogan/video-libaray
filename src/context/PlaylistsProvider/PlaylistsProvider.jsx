import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../AuthProvider";
import { reducer, initialPlaylist } from "./playlist.reducer";
import { getUserPlaylist } from "./playlistProvider.services";
import { getPlaylistIdByName } from "utils";
import { Loader } from "common-components/Loader";
const PlaylistContext = createContext();

export const PlaylistsProvider = ({ children }) => {
  const [playlists, playlistDispatch] = useReducer(reducer, initialPlaylist);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      (async () => {
        setLoading(true);
        const res = await getUserPlaylist();
        if ("data" in res) {
          playlistDispatch({
            type: "LOAD_USER_PLAYLIST",
            payload: res.data,
          });
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (loading) {
    return <Loader />;
  }

  const savedVideosPlaylistId = getPlaylistIdByName(playlists, "Saved Videos");
  const likeVideosPlaylistId = getPlaylistIdByName(playlists, "Liked Videos");
  const notesVidoesPlaylistId = getPlaylistIdByName(playlists, "My Notes");
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        savedVideosPlaylistId,
        likeVideosPlaylistId,
        notesVidoesPlaylistId,
        playlistDispatch,
        loading,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
export const usePlaylist = () => {
  return useContext(PlaylistContext);
};
