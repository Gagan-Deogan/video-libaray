import React, { useState } from "react";
import "./addPlaylist.css";
import { CloseIcon } from "../../assests/icons";
import { usePlaylistContext } from "../../Context/PlaylistContext";

export const AddToPlaylistModel = ({ vidoeToPlaylist, setVideoToPlaylist }) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState();
  const {
    playlists,
    handelCreatePlaylist,
    getPlaylistsNamesIncludeThisVideo,
    AddVideoToPlaylist,
    RemoveFromPlaylist,
  } = usePlaylistContext();

  const playlistsIncludeThisVideo = getPlaylistsNamesIncludeThisVideo({
    playlists,
    vidoeToPlaylist,
  });
  const getAllPlaylistName = () => {
    return playlists.map((playlist) => playlist.name);
  };
  const isError = getAllPlaylistName().includes(newPlaylistName);
  const handleAddOrRemoveFromPlaylist = ({
    playlistsIncludeThisVideo,
    vidoeToPlaylist,
    playlist,
  }) => {
    if (!playlistsIncludeThisVideo.includes(playlist.name)) {
      AddVideoToPlaylist({ vidoeToPlaylist, playlistId: playlist._id });
    } else {
      RemoveFromPlaylist({ vidoeToPlaylist, playlistId: playlist._id });
    }
  };

  return (
    <div className="model-container pos-f justify-center align-center box-shd ">
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
            playlists.map((playlist) => (
              <label className="row margin-t-8 align-center" key={playlist._id}>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleAddOrRemoveFromPlaylist({
                      playlistsIncludeThisVideo,
                      vidoeToPlaylist,
                      playlist,
                    })
                  }
                  checked={playlistsIncludeThisVideo.includes(playlist.name)}
                />
                <div className="check margin-r-16"></div>
                <p>{playlist.name}</p>
              </label>
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
              <div className={isError ? "text-err" : "text-help"}>
                {isError && "This Name already Exists"}
                {!isError && "Enter Name of new Playlist"}
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
                onClick={() =>
                  handelCreatePlaylist({
                    newPlaylistName,
                    playlistsIncludeThisVideo,
                    setShowCreatePlaylist,
                    setNewPlaylistName,
                  })
                }
                disabled={!!!newPlaylistName || isError}>
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
