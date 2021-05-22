import React, { useContext, createContext, useReducer } from "react";
import { useSnakbarContext } from "../SnakbarContext";
import { reducer, initial } from "./reducer";
import { useAuthContext } from "../AuthContext";
import { useRequest } from "../../utils";
const LikedAndDisLikedVideos = createContext();

export const LikedAndDisLikedVideosProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { request } = useRequest();
  const { snakbarDispatch } = useSnakbarContext();
  const [prefrenceVideos, likeAndDislikeVideosDispatch] = useReducer(
    reducer,
    initial
  );

  const hnadleVideoPrefenceToogle = async ({ video, toogleType }) => {
    if (user) {
      const { success, data } = await request({
        method: "POST",
        endpoint: `prefrences/${user.prefrence._id}/${video._id}`,
        body: {
          feels: toogleType,
        },
      });
      if (success) {
        likeAndDislikeVideosDispatch({ type: toogleType, payload: { video } });
      }
    } else {
      likeAndDislikeVideosDispatch({ type: toogleType, payload: { video } });
    }
  };

  return (
    <LikedAndDisLikedVideos.Provider
      value={{
        prefrenceVideos,
        hnadleVideoPrefenceToogle,
      }}>
      {children}
    </LikedAndDisLikedVideos.Provider>
  );
};
export const useLikedAndDisLikedVideosContext = () => {
  return useContext(LikedAndDisLikedVideos);
};
