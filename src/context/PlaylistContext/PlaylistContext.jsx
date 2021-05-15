import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSnakbarContext } from "../SnakbarContext";
import { useAuthContext } from "../AuthContext";
import { reducer, initialPlaylist } from "./reducer";
import { useRequest } from "../../utils";
const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, playlistDispatch] = useReducer(reducer, initialPlaylist);
  const { snakbarDispatch } = useSnakbarContext();
  const { user } = useAuthContext();
  const { request } = useRequest();

  const handelCreatePlaylist = async ({
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
      if (user) {
        const { success, data } = await request({
          method: "POST",
          endpoint: `/playlists/create/${user._id}`,
          body: { name: newPlaylistName },
        });
        if (success) {
          playlistDispatch({
            type: "SET_USER_PLAYLIST",
            payload: data,
          });
          snakbarDispatch({
            type: "SUCCESS",
            payload: "Playlist updated Succesfully",
          });
          setShowCreatePlaylist(false);
          setNewPlaylistName("");
        }
      } else {
        playlistDispatch({ type: "CREATE_PLAYLIST", payload: newPlaylistName });
        setShowCreatePlaylist(false);
        setNewPlaylistName("");
        snakbarDispatch({
          type: "SUCCESS",
          payload: "Playlist Created Successfully",
        });
      }
    }
  };

  const getPlaylistsNamesIncludeThisVideo = ({
    playlists,
    videoToPlaylist,
  }) => {
    try {
      const reducer = (acc, playlist) => {
        const isAlreadyInclude = playlist.videos.find(
          (video) => video._id === videoToPlaylist._id
        );
        return !!isAlreadyInclude ? acc.concat([playlist.name]) : acc;
      };
      return playlists.reduce(reducer, []);
    } catch (err) {
      return [];
    }
  };

  const ToogleVideoFromPlaylist = async ({ video, playlistId }) => {
    if (user) {
      const { success, data } = await request({
        method: "POST",
        endpoint: `playlists/${user._id}/${playlistId}/${video._id}`,
      });
      if (success) {
        playlistDispatch({
          type: "SET_USER_PLAYLIST",
          payload: data,
        });
        snakbarDispatch({
          type: "SUCCESS",
          payload: "Playlist updated Succesfully",
        });
      }
    } else {
      playlistDispatch({
        type: "TOOGLE_VIDEO_FROM_PLAYLIST",
        payload: { video, playlistId },
      });
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Playlist updated Succesfully",
      });
    }
  };

  const setPlaylists = ({ playlists }) => {
    playlistDispatch({
      type: "SET_USER_PLAYLIST",
      payload: playlists,
    });
  };

  const RemovePlaylist = async ({ playlistId }) => {
    if (user) {
      const { success, data } = await request({
        method: "DELETE",
        endpoint: `playlists/${user._id}/${playlistId}`,
      });
      if (success) {
        playlistDispatch({
          type: "REMOVE_PLAYLIST",
          payload: playlistId,
        });
        snakbarDispatch({
          type: "SUCCESS",
          payload: data,
        });
      }
    } else {
      playlistDispatch({
        type: "REMOVE_PLAYLIST",
        payload: playlistId,
      });
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Playlist Removed Successfully",
      });
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const { success, data } = await request({
          method: "GET",
          endpoint: `/playlists/${user._id}`,
        });
        if (success) {
          setPlaylists({ playlists: data });
        }
      })();
    }
  }, [user]);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        playlistDispatch,
        handelCreatePlaylist,
        getPlaylistsNamesIncludeThisVideo,
        ToogleVideoFromPlaylist,
        RemovePlaylist,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};
