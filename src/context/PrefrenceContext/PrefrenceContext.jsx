import React, { useContext, createContext, useReducer } from "react";
import { useSnakbarContext } from "../SnakbarContext";
import { reducer, initial } from "./reducer";
const LikedAndDisLikedVideos = createContext();

export const LikedAndDisLikedVideosProvider = ({ children }) => {
  const { snakbarDispatch } = useSnakbarContext();
  const [
    { likedVideos, disLikedVideos },
    likeAndDislikeVideosDispatch,
  ] = useReducer(reducer, initial);

  const handleLikeToggle = ({ videoDetails, toggleType }) => {
    if (toggleType) {
      likeAndDislikeVideosDispatch({
        type: "ADD_TO_LIKE_VIDEOS",
        payload: videoDetails,
      });
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_DISLIKE_VIDEOS",
        payload: videoDetails._id,
      });
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Added To Liked videos",
      });
    } else {
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_LIKE_VIDEOS",
        payload: videoDetails._id,
      });
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Removed from Liked videos",
      });
    }
  };

  const handleDislikeToggle = ({ videoDetails, toggleType }) => {
    if (toggleType) {
      likeAndDislikeVideosDispatch({
        type: "ADD_TO_DISLIKE_VIDEOS",
        payload: videoDetails,
      });
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_LIKE_VIDEOS",
        payload: videoDetails._id,
      });
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Added to Disliked videos",
      });
    } else {
      likeAndDislikeVideosDispatch({
        type: "REMOVE_FROM_DISLIKE_VIDEOS",
        payload: videoDetails._id,
      });
      snakbarDispatch({
        type: "SUCCESS",
        payload: "Removed from Disliked videos",
      });
    }
  };

  return (
    <LikedAndDisLikedVideos.Provider
      value={{
        likedVideos,
        disLikedVideos,
        handleLikeToggle,
        handleDislikeToggle,
      }}>
      {children}
    </LikedAndDisLikedVideos.Provider>
  );
};
export const useLikedAndDisLikedVideosContext = () => {
  return useContext(LikedAndDisLikedVideos);
};
