import React, { useState } from "react";
import "./addPlaylist.css";
import { CloseIcon } from "../../assests/icons";
import { usePlaylistContext } from "../../Context/PlaylistProvider";

export const AddToPlaylistModel = ({ vidoeToPlaylist, setVideoToPlaylist }) => {
  const [createPlaylist, SetCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState();
  const { playlists, playlistDispatch } = usePlaylistContext();
  const getPlaylistsNamesIncludeVideo = () => {
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
  const includedPlaylist = getPlaylistsNamesIncludeVideo();
  const getAllPlaylistName = () => {
    return playlists.map((playlist) => playlist.name);
  };
  const isError = getAllPlaylistName().includes(newPlaylistName);
  const handlePlaylist = (playlist) => {
    if (includedPlaylist.includes(playlist.name)) {
      playlistDispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        payload: { video: vidoeToPlaylist, playlistId: playlist.id },
      });
    } else {
      playlistDispatch({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: { video: vidoeToPlaylist, playlistId: playlist.id },
      });
    }
  };
  const handelCreatePlaylist = () => {
    if (includedPlaylist.includes(newPlaylistName) || !!!newPlaylistName) {
      console.log("Error");
    } else {
      playlistDispatch({ type: "CREATE_PLAYLIST", payload: newPlaylistName });
      SetCreatePlaylist(false);
    }
  };
  return (
    <div className="model-container pos-f justify-center align-center box-shd ">
      <div className="model sm-w9 md-w5 w3 bor-rad-4 box-shd add-playlist-model">
        <div className="row justify-between align-center">
          <h3>{createPlaylist ? "Create Playlist" : "Save to.."}</h3>
          <button
            className="btn-link"
            onClick={() => {
              setVideoToPlaylist();
            }}>
            <CloseIcon />
          </button>
        </div>
        <fieldset className="column margin-t-8 padding-t-8 padding-b-16">
          {createPlaylist && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="new Playlist"
                className={isError ? "err-text-area margin-t-8" : "margin-t-8"}
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}></input>
              <div className={isError ? "err-text" : "text-help"}>
                {isError && "This Name already Exits"}
                {!isError && "Enter Name of new Playlist"}
              </div>
            </>
          )}
          {!createPlaylist &&
            playlists.map((playlist) => (
              <label className="row margin-t-8 align-center" key={playlist.id}>
                <input
                  type="checkbox"
                  onChange={() => handlePlaylist(playlist)}
                  checked={includedPlaylist.includes(playlist.name)}
                />
                <div className="check margin-r-16"></div>
                <p>{playlist.name}</p>
              </label>
            ))}
        </fieldset>
        <fieldset className="padding-8 row justify-end">
          {createPlaylist && (
            <>
              <button
                className="sm-btn-pry margin-r-16"
                onClick={() => SetCreatePlaylist(false)}>
                Cancel
              </button>
              <button
                className={
                  !!!newPlaylistName || isError
                    ? "sm-btn-pry-fil btn-dis"
                    : "sm-btn-pry-fil"
                }
                onClick={() => handelCreatePlaylist()}
                disabled={!!!newPlaylistName || isError}>
                Create
              </button>
            </>
          )}
          {!createPlaylist && (
            <button
              className="sm-btn-pry"
              onClick={() => SetCreatePlaylist(true)}>
              Create Playlist
            </button>
          )}
        </fieldset>
      </div>
    </div>
  );
};
