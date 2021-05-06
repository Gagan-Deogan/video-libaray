import React, { createContext, useContext, useReducer } from "react";
import { useSnakbarContext } from "../SnakbarContext";
import { reducer, initialPlaylist } from "./reducer";
const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, playlistDispatch] = useReducer(reducer, initialPlaylist);
  const { snakbarDispatch } = useSnakbarContext();
  const handelCreatePlaylist = ({
    newPlaylistName,
    playlistsIncludeThisVideo,
    setShowCreatePlaylist,
    setNewPlaylistName,
  }) => {
    if (
      playlistsIncludeThisVideo.includes(newPlaylistName) ||
      !!!newPlaylistName
    ) {
      return null;
    } else {
      playlistDispatch({ type: "CREATE_PLAYLIST", payload: newPlaylistName });
      setShowCreatePlaylist(false);
      setNewPlaylistName("");
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Playlist Created Successfully",
      });
    }
  };

  const getPlaylistsNamesIncludeThisVideo = ({
    playlists,
    vidoeToPlaylist,
  }) => {
    try {
      const reducer = (acc, playlist) => {
        const isAlreadyInclude = playlist.videos.find(
          (video) => video.id === vidoeToPlaylist.id
        );
        return !!isAlreadyInclude ? acc.concat([playlist.name]) : acc;
      };
      return playlists.reduce(reducer, []);
    } catch (err) {
      return [];
    }
  };
  const AddVideoToPlaylist = ({ vidoeToPlaylist, playlistId }) => {
    playlistDispatch({
      type: "ADD_VIDEO_TO_PLAYLIST",
      payload: { video: vidoeToPlaylist, playlistId },
    });
    snakbarDispatch({ type: "SUCCESS", payload: "Video Added Succesfully" });
  };
  const RemoveFromPlaylist = ({ vidoeToPlaylist, playlistId }) => {
    playlistDispatch({
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      payload: { video: vidoeToPlaylist, playlistId },
    });
    snakbarDispatch({ type: "SUCCESS", payload: "Video Remove Succesfully" });
  };
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        playlistDispatch,
        handelCreatePlaylist,
        getPlaylistsNamesIncludeThisVideo,
        AddVideoToPlaylist,
        RemoveFromPlaylist,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};
