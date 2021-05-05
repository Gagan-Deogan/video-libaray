import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useLikedAndDisLikedVideosContext } from "../../Context/LikedAndDislikeVideosProvider";
import { AddToPlaylistModel } from "../AddToPlaylistModel";
import { useSaveVideosContext } from "../../Context/SaveVideosProvider";
import { ddmmmyyyy, hhmmss } from "../../utils";
import {
  SaveIcon,
  PlaylistAddIcon,
  LikeIcon,
  DislikeIcon,
} from "../../assests/icons/";

export const VidoeDetailsContainer = ({
  videoId,
  videoDetails,
  setVideoPlayed,
}) => {
  const {
    likedVideos,
    disLikedVideos,
    handleLikeToggle,
    handleDislikeToggle,
  } = useLikedAndDisLikedVideosContext();
  const { handleSaveVideoToggle } = useSaveVideosContext();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  const isInList = (videosList, videoId) => {
    return !!videosList.find((video) => video.id === videoId);
  };
  const isLiked = isInList(likedVideos, videoDetails?.id);
  const isDisLiked = isInList(disLikedVideos, videoDetails?.id);
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
        <h3 className="margin-t-16 margin-l-8">{videoDetails.snippet.title}</h3>
        <div className="row w12">
          <div className="row w6 justify-start align-center">
            <h6 className="gry margin-l-8">
              {videoDetails.statistics.viewCount} views •{" "}
              {ddmmmyyyy(videoDetails.snippet.publishedAt)}
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
            </button>
          </div>
        </div>
        <h6 className="padding-8 padding-b-16 ">
          {videoDetails.snippet.description.slice(0, 250)}
        </h6>
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
