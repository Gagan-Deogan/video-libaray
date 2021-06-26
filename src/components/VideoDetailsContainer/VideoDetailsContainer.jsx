import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { usePrefrenced } from "context/PrefrenceProvider";
import { AddToPlaylistModel } from "../AddToPlaylistModel";
import { useSaveVideosContext } from "context/SaveVideosProvider";
import { hhmmss, getUserfeels } from "utils";
import {
  SaveIcon,
  PlaylistAddIcon,
  LikeIcon,
  DislikeIcon,
} from "assests/icons";

export const VideoDetailsContainer = ({ videoDetails, setVideoPlayed }) => {
  const {
    ytId,
    title,
    description,
    likes,
    dislikes,
    publishedAt,
    views,
  } = videoDetails;
  const { prefrenceVideos, handleVideoPrefenceToogle } = usePrefrenced();
  const { handleSaveVideoToggle } = useSaveVideosContext();
  const [videoToPlaylist, setVideoToPlaylist] = useState();
  const prefrence = getUserfeels({
    prefrenceVideos,
    videoId: videoDetails._id,
  });
  return (
    <>
      <div className="card bor-rad-8 video-container ">
        <div className="video-player w12 bor-rad-8 ovr-flw-hide">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${ytId}`}
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
                handleVideoPrefenceToogle({
                  video: videoDetails,
                  toogleType: prefrence === "LIKE" ? "REMOVE" : "LIKE",
                })
              }>
              <LikeIcon isActive={prefrence === "LIKE"} />
              <h6 className="text-grey bold margin-l-4 ">{likes}</h6>
            </button>
            <button
              className="btn-link margin-8"
              onClick={(e) =>
                handleVideoPrefenceToogle({
                  video: videoDetails,
                  toogleType: prefrence === "DISLIKE" ? "REMOVE" : "DISLIKE",
                })
              }>
              <DislikeIcon isActive={prefrence === "DISLIKE"} />
              <h6 className="text-grey bold margin-l-4 ">{dislikes}</h6>
            </button>
          </div>
        </div>
        <h6 className="padding-8 padding-b-16">{description}</h6>
      </div>
      {videoToPlaylist && (
        <AddToPlaylistModel
          videoToPlaylist={videoToPlaylist}
          setVideoToPlaylist={setVideoToPlaylist}
        />
      )}
    </>
  );
};
