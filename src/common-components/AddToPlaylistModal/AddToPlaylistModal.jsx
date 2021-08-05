import React, { useState } from "react";
import "./addPlaylist.css";
import { CloseIcon, DeleteIcon } from "assests/icons";
import { usePlaylist } from "context/PlaylistsProvider";
import { getPlaylistsWithIsIncludedFlag, removeCommonPlaylist } from "utils";
import { updatePlaylist, createNewPlaylist, removePlaylist } from "utils";
import { debounce } from "utils";
import { commonPlaylist } from "constants/index";
import { CreatePlaylist } from "./CreatePlaylist";
import { useSnakbar } from "context/SnakbarProvider";

const giveActionForSnakbarOnVideoToogleFormPlaylist = (type) => {
  const payload =
    type === "SUCCESS"
      ? "Video Added to Playlist"
      : "Video Removed From Playlist";
  return { type, payload };
};

export const AddToPlaylistModal = ({ videoToPlaylist, setVideoToPlaylist }) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const { snakbarDispatch } = useSnakbar();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { playlists, playlistDispatch } = usePlaylist();

  const playlistsWithoutCommon = removeCommonPlaylist(playlists);
  const playlistsWithIsIncludedFlag = getPlaylistsWithIsIncludedFlag(
    playlistsWithoutCommon,
    videoToPlaylist
  );
  const isError = !!playlists.find(
    (playlist) => playlist.name === newPlaylistName
  );

  const toogleVideoFromPlaylist = async (playlistId, videoToPlaylist, type) => {
    playlistDispatch({
      type: "TOOGLE_VIDEO_FROM_PLAYLIST",
      payload: { playlistId, video: videoToPlaylist },
    });
    snakbarDispatch(giveActionForSnakbarOnVideoToogleFormPlaylist(type));
    const res = await updatePlaylist(playlistId, videoToPlaylist._id);
    if (!("data" in res)) {
      playlistDispatch({
        type: "TOOGLE_VIDEO_FROM_PLAYLIST",
        payload: { playlistId, video: videoToPlaylist },
      });
    }
  };
  const betterToogleVideoFromPlaylist = debounce(toogleVideoFromPlaylist, 500);

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
      snakbarDispatch({ type: "ERROR", payload: "Playlist Removed" });
      playlistDispatch({
        type: "REMOVE_PLAYLIST",
        payload: playlistId,
      });
    }
  };
  const betterHandleRemovePlaylist = debounce(handleRemovePlaylist, 500);
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
        {!showCreatePlaylist && (
          <>
            <fieldset className="column margin-t-8 padding-t-8 padding-b-16">
              {playlistsWithIsIncludedFlag.map((playlist) => (
                <div className="row justify-between align-center">
                  <label
                    className="row margin-t-8 align-center"
                    key={playlist._id}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        betterToogleVideoFromPlaylist(
                          playlist._id,
                          videoToPlaylist,
                          playlist.isAlreadyIncluded ? "ERROR" : "SUCCESS"
                        )
                      }
                      checked={playlist.isAlreadyIncluded}
                    />
                    <div className="check margin-r-16"></div>
                    <p>{playlist.name}</p>
                  </label>
                  {!commonPlaylist.includes(playlist.name) && (
                    <button
                      className="btn-link"
                      onClick={() => {
                        betterHandleRemovePlaylist(playlist._id);
                      }}>
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              ))}
            </fieldset>
            <fieldset className="padding-8 row justify-end">
              <button
                className="sm-btn-pry"
                onClick={() => setShowCreatePlaylist(true)}>
                Create Playlist
              </button>
            </fieldset>
          </>
        )}
        {showCreatePlaylist && (
          <CreatePlaylist
            isError={isError}
            newPlaylistName={newPlaylistName}
            setNewPlaylistName={setNewPlaylistName}
            setShowCreatePlaylist={setShowCreatePlaylist}
            handleCreatePlaylist={handleCreatePlaylist}
          />
        )}
      </div>
    </div>
  );
};
