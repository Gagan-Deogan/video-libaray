import React, {useContext, createContext, useReducer } from "react";

const LikedAndDisLikedVideos = createContext();
const initial = { likedVideos:[], disLikedVideos:[] }
const reducer = ( state, action ) =>{
    switch(action.type){
        case "ADD_TO_LIKE_VIDEOS":
            return { ...state, likedVideos:state.likedVideos.concat([action.payload]) };
        case "REMOVE_FROM_LIKE_VIDEOS":
            return { ...state, likedVideos:state.likedVideos.filter( video => video.id !== action.payload ) };
        case "ADD_TO_DISLIKE_VIDEOS":
            return { ...state, disLikedVideos:state.disLikedVideos.concat([action.payload]) };
        case "REMOVE_FROM_DISLIKE_VIDEOS":
            return { ...state, disLikedVideos:state.disLikedVideos.filter( video => video.id !== action.payload ) };
        default:
            return state;
    }
}
export const LikedAndDisLikedVideosProvider = ({children}) =>{
    const [{likedVideos, disLikedVideos} , likeAndDislikeVideosDispatch ] = useReducer( reducer, initial )
    return(
        <LikedAndDisLikedVideos.Provider value={{likedVideos, disLikedVideos,likeAndDislikeVideosDispatch }} >
            {children}
        </LikedAndDisLikedVideos.Provider>
    )
}
export const useLikedAndDisLikedVideosContext = () =>{
    return useContext(LikedAndDisLikedVideos)
}