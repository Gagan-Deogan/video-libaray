import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useLikedAndDisLikedVideosContext } from "../../Context/LikedAndDislikeVideosContext";
import { AddToPlaylistModel } from "../AddToPlaylistModel";
import { useSaveVideosContext } from "../../Context/SaveVideosContext";
import { ddmmmyyyy, hhmmss } from "../../utils";
import {
  SaveIcon,
  PlaylistAddIcon,
  LikeIcon,
  DislikeIcon,
} from "../../assests/icons/";

export const VidoeDetailsContainer = ({ videoDetails, setVideoPlayed }) => {
  const {
    videoId,
    title,
    description,
    likes,
    dislikes,
    publishedAt,
    views,
  } = videoDetails;
  const {
    likedVideos,
    disLikedVideos,
    handleLikeToggle,
    handleDislikeToggle,
  } = useLikedAndDisLikedVideosContext();
  const { handleSaveVideoToggle } = useSaveVideosContext();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  const isInList = (videosList, id) => {
    return !!videosList.find((video) => video._id === id);
  };
  const isLiked = isInList(likedVideos, videoDetails?._id);
  const isDisLiked = isInList(disLikedVideos, videoDetails?._id);
  return (
    <>
      <div className="card bor-rad-8 video-container ">
        <div className="video-player w12 bor-rad-8 ovr-flw-hide">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls={true}
            width="100%"
            height="100%"
            onProgress={(progress) => {
              setVideoPlayed(hhmmss(progress.played));
            }}
          />
        </div>
        <h3 className="margin-t-16 margin-l-8">{title}</h3>
        <div className="row w12">
          <div className="row w6 justify-start align-center">
            <h6 className="gry margin-l-8">
              {views} views • {publishedAt}
            </h6>
          </div>
          <div className="row w6 justify-end">
            <button
              className="btn-link margin-8"
              onClick={() => setVideoToPlaylist(videoDetails)}>
              <PlaylistAddIcon />
            </button>
            <button
              className="btn-link margin-8"
              onClick={() => handleSaveVideoToggle({ videoDetails })}>
              <SaveIcon />
            </button>
            <button
              className="btn-link margin-8"
              onClick={() =>
                handleLikeToggle({ videoDetails, toggleType: !isLiked })
              }>
              <LikeIcon isActive={isLiked} />
              <h6 className="text-grey bold margin-l-4 ">{likes}</h6>
            </button>
            <button
              className="btn-link margin-8"
              onClick={(e) =>
                handleDislikeToggle({
                  videoDetails,
                  toggleType: !isDisLiked,
                })
              }>
              <DislikeIcon isActive={isDisLiked} />
              <h6 className="text-grey bold margin-l-4 ">{dislikes}</h6>
            </button>
          </div>
        </div>
        <h6 className="padding-8 padding-b-16">{description}</h6>
      </div>
      {vidoeToPlaylist && (
        <AddToPlaylistModel
          vidoeToPlaylist={vidoeToPlaylist}
          setVideoToPlaylist={setVideoToPlaylist}
        />
      )}
    </>
  );
};
