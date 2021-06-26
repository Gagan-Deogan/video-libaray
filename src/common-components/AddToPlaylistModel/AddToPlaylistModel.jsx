import React, { useState } from "react";
import "./addPlaylist.css";
import { CloseIcon, DeleteIcon } from "assests/icons";
import { usePlaylist } from "context/PlaylistProvider";
import { getAllPlaylistNameAndIsVideoAlreadyIncluded } from "utils";
import {
  updatePlaylist,
  createNewPlaylist,
  removePlaylist,
} from "./addToPlaylistModel.services";

export const AddToPlaylistModel = ({ videoToPlaylist, setVideoToPlaylist }) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const {
    playlists,
    playlistDispatch,
    // RemovePlaylist,
  } = usePlaylist();

  const playlistsNamesWithIsAlreadyInclude = getAllPlaylistNameAndIsVideoAlreadyIncluded(
    playlists,
    videoToPlaylist
  );
  const isError = !!playlists.find(
    (playlist) => playlist.name === newPlaylistName
  );

  const ToogleVideoFromPlaylist = async (playlistId, videoToPlaylist) => {
    playlistDispatch({
      type: "TOOGLE_VIDEO_FROM_PLAYLIST",
      payload: { playlistId, video: videoToPlaylist },
    });
    const res = await updatePlaylist(playlistId, videoToPlaylist._id);
    if (!("data" in res)) {
      playlistDispatch({
        type: "TOOGLE_VIDEO_FROM_PLAYLIST",
        payload: { playlistId, video: videoToPlaylist },
      });
    }
  };

  const handleCreatePlaylist = async () => {
    const res = await createNewPlaylist(newPlaylistName);
    if ("data" in res) {
      playlistDispatch({
        type: "CREATE_PLAYLIST",
        payload: res.data,
      });
      setShowCreatePlaylist(false);
    }
  };

  const handleRemovePlaylist = async (playlistId) => {
    const res = await removePlaylist(playlistId);
    if ("data" in res) {
      playlistDispatch({
        type: "REMOVE_PLAYLIST",
        payload: playlistId,
      });
    }
  };

  return (
    <div className="model-container position-fixed justify-center align-center box-shd ">
      <div className="model sm-w9 md-w5 w3 bor-rad-4 box-shd add-playlist-model">
        <div className="row justify-between align-center">
          <h3>{showCreatePlaylist ? "Create Playlist" : "Save to .."}</h3>
          <button
            className="btn-link"
            onClick={() => {
              setVideoToPlaylist();
            }}>
            <CloseIcon />
          </button>
        </div>
        <fieldset className="column margin-t-8 padding-t-8 padding-b-16">
          {!showCreatePlaylist &&
            playlistsNamesWithIsAlreadyInclude.map((playlist) => (
              <div className="row justify-between align-center">
                <label
                  className="row margin-t-8 align-center"
                  key={playlist._id}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      ToogleVideoFromPlaylist(playlist._id, videoToPlaylist)
                    }
                    checked={playlist.isAlreadyIncluded}
                  />
                  <div className="check margin-r-16"></div>
                  <p>{playlist.name}</p>
                </label>
                {playlist.name !== "My Playlist" && (
                  <button
                    className="btn-link"
                    onClick={() => {
                      handleRemovePlaylist(playlist._id);
                    }}>
                    {" "}
                    <DeleteIcon />{" "}
                  </button>
                )}
              </div>
            ))}
          {showCreatePlaylist && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="new Playlist"
                className={isError ? "text-err-area margin-t-8" : "margin-t-8"}
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}></input>
              <div className={isError && "text-err"}>
                {isError && "This Name already Exists"}
              </div>
            </>
          )}
        </fieldset>
        <fieldset className="padding-8 row justify-end">
          {showCreatePlaylist && (
            <>
              <button
                className="sm-btn-pry margin-r-16"
                onClick={() => setShowCreatePlaylist(false)}>
                Cancel
              </button>
              <button
                className={
                  !!!newPlaylistName || isError
                    ? "sm-btn-pry-fil btn-dis"
                    : "sm-btn-pry-fil"
                }
                onClick={handleCreatePlaylist}
                disabled={!newPlaylistName || isError}>
                Create
              </button>
            </>
          )}
          {!showCreatePlaylist && (
            <button
              className="sm-btn-pry"
              onClick={() => setShowCreatePlaylist(true)}>
              Create Playlist
            </button>
          )}
        </fieldset>
      </div>
    </div>
  );
};
