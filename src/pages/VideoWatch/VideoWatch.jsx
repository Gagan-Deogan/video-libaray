import "./watch.css";
import { useState, useEffect } from "react";
import {
  SaveIcon,
  PlaylistAddIcon,
  LikeIcon,
  DislikeIcon,
} from "../../assests/icons/";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { AddToPlaylistModel } from "../../Components/AddToPlaylistModel";
import { useRequest } from "../../utils";
import { useLikedAndDisLikedVideosContext } from "../../Context";
import { useSaveVideosContext } from "../../Context";

const options = {
  controls: true,
};

export const VideoWatch = () => {
  const { id } = useParams();
  const { request } = useRequest();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  const [videoDetails, setVideoDetails] = useState();
  const {
    likedVideos,
    disLikedVideos,
    likeAndDislikeVideosDispatch,
  } = useLikedAndDisLikedVideosContext();
  const { saveDispatch } = useSaveVideosContext();

  useEffect(() => {
    (async () => {
      const { items } = await request({ endpoint: id, method: "GET" });
      if (items) {
        setVideoDetails(items[0]);
      }
    })();
  }, []);

  const ddmmmyyyy = (date) => {
    return new Date(date).toLocaleString("en-UG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleLikeToggle = (video, toggle) => {
    console.log(video, toggle);
    if (toggle) {
      likeAndDislikeVideosDispatch({
        type: "ADD_TO_LIKE_VIDEOS",
        payload: video,
      });
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_DISLIKE_VIDEOS",
        payload: video.id,
      });
    } else
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_LIKE_VIDEOS",
        payload: video.id,
      });
  };

  const handleDislikeToggle = (video, toggle) => {
    if (toggle) {
      likeAndDislikeVideosDispatch({
        type: "ADD_TO_DISLIKE_VIDEOS",
        payload: video,
      });
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_LIKE_VIDEOS",
        payload: video.id,
      });
    } else
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_DISLIKE_VIDEOS",
        payload: video.id,
      });
  };
  const isInList = (videosList, videoId) => {
    return !!videosList.find((video) => video.id === videoId);
  };
  const isLiked = isInList(likedVideos, videoDetails?.id);
  const isDisLiked = isInList(disLikedVideos, videoDetails?.id);
  const handleAddTOSave = (video) => {
    saveDispatch({ type: "ADD_TO_SAVE", payload: video });
  };
  return (
    <section className="column padding-8 w8 sm-w12">
      {videoDetails && (
        <div className="card bor-rad-8 video-container ">
          <div className="video-player w12 bor-rad-8 ovr-flw-hide">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              {...options}
              width="100%"
              height="100%"
            />
          </div>
          <h3 className="margin-t-16 margin-l-8">
            {videoDetails.snippet.title}
          </h3>
          <h6 className="gry margin-l-8">
            {videoDetails.statistics.viewCount} views •{" "}
            {ddmmmyyyy(videoDetails.snippet.publishedAt)}
          </h6>
          <h6 className="margin-l-8">
            {videoDetails.snippet.description.slice(0, 250)}
          </h6>
          <div className="row w12 justify-end">
            <button
              className="btn-link margin-8"
              onClick={() => setVideoToPlaylist(videoDetails)}>
              <PlaylistAddIcon />
            </button>
            <button
              className="btn-link margin-8"
              onClick={() => handleAddTOSave(videoDetails)}>
              <SaveIcon />
            </button>
            <button
              className="btn-link margin-8"
              onClick={() => handleLikeToggle(videoDetails, !isLiked)}>
              <LikeIcon isActive={isLiked} />
            </button>
            <button
              className="btn-link margin-8"
              onClick={(e) => handleDislikeToggle(videoDetails, !isDisLiked)}>
              <DislikeIcon isActive={isDisLiked} />
            </button>
          </div>
        </div>
      )}
      {vidoeToPlaylist && (
        <AddToPlaylistModel
          vidoeToPlaylist={vidoeToPlaylist}
          setVideoToPlaylist={setVideoToPlaylist}
        />
      )}
    </section>
  );
};
