import React, { useState } from "react";
import "./card.css";
import { ThreeDotsIcon, SaveIcon, PlaylistAddIcon } from "../../assests/icons";
import { useNavigate } from "react-router-dom";
export const Card = ({
  video,
  setVideoToPlaylist,
  cardFor,
  handleSaveVideoToggle,
}) => {
  const navigate = useNavigate();
  const [expandDropDown, setExpandDropDown] = useState(false);
  const callSave = (video) => {
    handleSaveVideoToggle({ videoDetails: video });
    setExpandDropDown(false);
  };
  const handleVideoWatch = () => {
    navigate(`/watch/${video.id}`);
  };
  return (
    <>
      <li className="column card pos-r hov-box-shd bor-rad-8">
        <img
          src={video.snippet.thumbnails.high.url}
          className="w12 bor-rad-8 cursor-pointer"
          alt=""
          onClick={handleVideoWatch}
        />
        <div className="row padding-8 padding-t-16 align-start">
          <div className="avatar-circle">
            <h4>{video.snippet.channelTitle.slice(0, 1)}</h4>
          </div>
          <div
            className="column crd-title w9 margin-l-8 cursor-pointer"
            onClick={handleVideoWatch}>
            <h6 className="bold">
              {video.snippet.title.slice(0, 65)}{" "}
              {video.snippet.title.length > 75 ? "..." : ""}{" "}
            </h6>
            <h6 className="gry">{video.snippet.channelTitle} </h6>
          </div>
          {cardFor === "EXPLORE_PAGE" && (
            <button
              className="btn-link"
              onClick={() => setExpandDropDown(!expandDropDown)}>
              <ThreeDotsIcon />
              {expandDropDown && (
                <ul className="drop-down">
                  <li
                    className="row align-center"
                    onClick={() => setVideoToPlaylist(video)}>
                    <PlaylistAddIcon />
                    <h6 className="bold margin-l-8">Add to Playlist</h6>
                  </li>
                  <li
                    className="row align-center"
                    onClick={() => callSave(video)}>
                    <SaveIcon />
                    <h6 className="bold margin-l-8">Save to Watch Later</h6>
                  </li>
                </ul>
              )}
            </button>
          )}
        </div>
      </li>
    </>
  );
};
