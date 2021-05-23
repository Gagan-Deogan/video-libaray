import React, { useContext, createContext, useReducer } from "react";
import { useSnakbarContext } from "../SnakbarContext";
import { reducer, initial } from "./reducer";
import { useAuthContext } from "../AuthContext";
import { useRequest } from "../../utils";
const PrefrencedVideosContext = createContext();

export const PrefrencedVideosProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { request } = useRequest();
  const [prefrenceVideos, prefrenceVideosDispatch] = useReducer(
    reducer,
    initial
  );

  const handleVideoPrefenceToogle = async ({ video, toogleType }) => {
    if (user) {
      try {
        const { success, data } = await request({
          method: "POST",
          endpoint: `prefrences/${user.prefrence._id}/${video._id}`,
          body: {
            feels: toogleType,
          },
        });
        if (success) {
          prefrenceVideosDispatch({ type: toogleType, payload: { video } });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      prefrenceVideosDispatch({ type: toogleType, payload: { video } });
    }
  };

  return (
    <PrefrencedVideosContext.Provider
      value={{
        prefrenceVideos,
        handleVideoPrefenceToogle,
      }}>
      {children}
    </PrefrencedVideosContext.Provider>
  );
};
export const usePrefrencedVideos = () => {
  return useContext(PrefrencedVideosContext);
};
