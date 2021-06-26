import React, { useState } from "react";
import "./card.css";
import { ThreeDotsIcon, SaveIcon, PlaylistAddIcon } from "assests/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
export const Card = ({
  video,
  setVideoToPlaylist,
  cardFor,
  handleSaveVideoToggle,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandDropDown, setExpandDropDown] = useState(false);
  const callSave = (video) => {
    handleSaveVideoToggle({ videoDetails: video });
    setExpandDropDown(false);
  };
  const handleVideoWatch = () => {
    navigate(`/watch/${video._id}`);
  };
  const { thumbnails, title, description } = video;
  return (
    <>
      <li className="column card pos-r hov-box-shd bor-rad-8">
        <img
          src={thumbnails}
          className="w12 bor-rad-8 cursor-pointer"
          alt={title}
          onClick={handleVideoWatch}
        />
        <div className="row padding-8 padding-t-16 align-start">
          <div
            className="column crd-title w11 margin-l-8 cursor-pointer"
            onClick={handleVideoWatch}>
            <h6 className="bold">
              {title.slice(0, 65)}
              {title.length > 75 ? "..." : ""}
            </h6>
            <h6 className="text-grey">
              {description.slice(0, 65)} {description.length > 75 ? "..." : ""}
            </h6>
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
