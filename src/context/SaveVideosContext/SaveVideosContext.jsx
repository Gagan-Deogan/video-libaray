import React, { createContext, useContext, useReducer } from "react";
import { useSnakbarContext } from "../SnakbarContext";
import { reducer, initial } from "./reducer";
const SaveVideoContext = createContext();

export const SaveVideosProvider = ({ children }) => {
  const [saveVideos, saveDispatch] = useReducer(reducer, initial);
  const { snakbarDispatch } = useSnakbarContext();

  const handleSaveVideoToggle = ({ videoDetails }) => {
    if (!!!saveVideos.find((video) => video._id === videoDetails._id)) {
      saveDispatch({ type: "ADD_TO_SAVE", payload: videoDetails });
      snakbarDispatch({ type: "DEFAULT", payload: "Added to Save Videos" });
    } else {
      saveDispatch({ type: "REMOVE_FROM_SAVE", payload: videoDetails._id });
      snakbarDispatch({ type: "DEFAULT", payload: "Removed from Save Videos" });
    }
  };

  return (
    <SaveVideoContext.Provider value={{ saveVideos, handleSaveVideoToggle }}>
      {children}
    </SaveVideoContext.Provider>
  );
};
export const useSaveVideosContext = () => {
  return useContext(SaveVideoContext);
};
