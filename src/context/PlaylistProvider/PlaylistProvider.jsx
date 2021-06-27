import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSnakbar } from "../SnakbarProvider";
import { useAuth } from "../AuthProvider";
import { reducer, initialPlaylist } from "./reducer";
import { getUserPlaylist } from "./playlistProvider.services";
import { getPlaylistIdByName } from "utils";
const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, playlistDispatch] = useReducer(reducer, initialPlaylist);
  const { user, token } = useAuth();

  const savedVideosPlaylistId = getPlaylistIdByName(playlists, "Saved Videos");
  const likeVideosPlaylistId = getPlaylistIdByName(playlists, "Liked Videos");
  const notesVidoesPlaylistId = getPlaylistIdByName(playlists, "My Notes");

  useEffect(() => {
    if (user && token) {
      (async () => {
        const res = await getUserPlaylist();
        if ("data" in res) {
          playlistDispatch({
            type: "LOAD_USER_PLAYLIST",
            payload: res.data,
          });
        }
      })();
    }
  }, [user, token]);

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
